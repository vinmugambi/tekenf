const assert = require("assert");
const app = require("../src/app");

describe("authentication", () => {
  it("registered the authentication service", () => {
    assert.ok(app.service("authentication"));
  });

  describe("local strategy", () => {
    const userInfo = {
      email: "someone@example.com",
      password: "supersecret",
    };

    before(async () => {
      try {
        await app.service("users").create(userInfo);
      } catch (error) {
        throw new Error(error);
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it("authenticates user and creates accessToken", async () => {
      const { user, accessToken } = await app.service("authentication").create({
        strategy: "local",
        ...userInfo,
      });

      assert.ok(accessToken, "Created access token for user");
      assert.ok(user, "Includes user in authentication data");
    });
  });

  describe("magic link authentication strategy", ()=> {
    let magicToken;
    let testEmail;
    it("sets a magic token on a user", async () => {
      try {
        const { email } = await app
          .service("authentication")
          .create({
            action: "sendMagicLink",
            email: "test@example.com",
          })
          .catch((err) => {
            throw new Error(err);
          });

        assert.ok(email, "responds with an email of the user");
        testEmail = email;

        const { data } = await app
          .service("users")
          .find({ query: { $limit: 1, email } })
          .catch((err) => {
            throw new Error(err);
          });
        magicToken = data[0].magic;
        assert.ok(magicToken, "one time magic token set on user");
      } catch (error) {
        throw new Error(error);
      }

      it("authenticates and sets user token", async () => {
        console.log(testEmail, magicToken);
        const { user, accessToken } = await app
          .service("authentication")
          .create({
            strategy: "link",
            email: testEmail,
            magic: magicToken,
          });

        assert.ok(accessToken, "Created authentication token for user");
        assert.ok(user, "Includes user in authentication data");
      });

      describe(" only one login attempt allowed", () => {
        it("it does not allow reuse of tokens", async () => {
          await app
            .service("authentication")
            .create({
              strategy: "link",
              email: testEmail,
              magic: magicToken,
            })
            .catch((err) => {
              assert.strictEqual(
                err.code,
                401,
                "It throws a not authenticated error"
              );
            });
        });
      });
    });
  });
});

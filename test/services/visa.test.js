const app = require("../../src/app");
const assert = require("assert");

describe("'visa' service", () => {
  it("registered the service", () => {
    const service = app.service("visa");
    assert.ok(service, "Registered the service");
  });

  it("creates a visa object and an accompanying verify object", async () => {
    const { _id, email } = await app
      .service("visa")
      .create({ email: "test@test.com" });
    assert.ok(email, "stores provided data");

    const { data } = await app.service("verify").find({ query: { visa: _id } });
    assert.strictEqual(data.length, 1);
  });

  it("returns a 400 Bad Request error, if email is not provided during creation", async () => {
    const { errors, code } = await app
      .service("visa")
      .create({ emai: "test@test.com" });
    assert.ok(errors, {});
    assert.strictEqual(code, 400);
  });
});

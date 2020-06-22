const app = require("../../src/app");
const assert = require("assert");

describe("'visa' service", () => {
  it("registered the service", () => {
    const service = app.service("visa");
    assert.ok(service, "Registered the service");
  });

  // it("returns a 400 Bad Request error, if email is not provided during creation", async () => {
  //   const { errors, code } = await app
  //     .service("visa")
  //     .create({ emai: "test@test.com" });
  //   assert.ok(errors, {});
  //   assert.strictEqual(code, 400);
  // });
});

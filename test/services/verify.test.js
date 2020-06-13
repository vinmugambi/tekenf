const app = require("../../src/app");
const assert = require("assert");

describe("'verify' service", () => {
  it("registered the service", () => {
    const service = app.service("verify");
    assert.ok(service, "Registered the service");
  });
});

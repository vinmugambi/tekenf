const assert = require("assert");
const url = require("url");
const app = require("../../src/app");
const axios = require("axios");

const port = app.get("port") || 8998;
const getUrl = (pathname) =>
  url.format({
    hostname: app.get("host") || "localhost",
    protocol: "http",
    port,
    pathname,
  });

describe("'mailer' service", () => {
  it("registered the service", () => {
    const service = app.service("mailer");

    assert.ok(service, "Registered the service");
  });

  it("sends an email using SMTP on create", async () => {
    let email = await app.service("mailer").create({
      from: "ford20@ethereal.com",
      to: "vinmuga@gmail.com",
      subject: "Testing Mailer service",
      text: "it is working",
    });
    assert.ok(email, "Email sent");
  });

  describe("disallow external methods", () => {
    let server;

    before(function (done) {
      server = app.listen(port);
      server.once("listening", () => done());
    });

    after(function (done) {
      server.close(done);
    });

    it("returns a 405 error", async () => {
      try {
        await axios.post(getUrl("/mailer"), {
          from: "ford20@ethereal.com",
          to: "vinmuga@gmail.com",
          subject: "Testing Mailer service",
          text: "it is working",
        });
        assert.fail("should never get here");
      } catch (error) {
        assert.equal(error.response.status, 405, "Method not allowed");
      }
    });
  });
});

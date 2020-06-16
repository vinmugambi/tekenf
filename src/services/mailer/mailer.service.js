// Initializes the `mailer` service on path `/mailer`
const Mailer = require("feathers-mailer");
const hooks = require("./mailer.hooks");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = function (app) {
  // Initialize our service with any options it requires
  app.use(
    "/mailer",
    Mailer(
      smtpTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "ford20@ethereal.email",
          pass: "Fr2M4yKQNE4MYWs9ch",
        },
      })
    )
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("mailer");

  service.hooks(hooks);
};

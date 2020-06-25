const Joi = require("@hapi/joi");
const { BadRequest } = require("@feathersjs/errors");
const bcrypt = require("bcryptjs");
const { getLongToken, getTokenLink } = require("./tokens");

module.exports = function (options = {}) {
  return async (context) => {
    if (
      !(context.data.action && context.data.action.trim() === "sendMagicLink")
    ) {
      return context;
    }
    if (!context.data.email) {
      throw new BadRequest("Email must be provided");
    }
    const validateEmail = Joi.string().email({ minDomainSegments: 2 });
    const { error, value } = await validateEmail.validate(context.data.email.trim());
    if (error) {
      throw new BadRequest("Email is invalid");
    }

    let token = await getLongToken(16).catch((err) => {
      throw new Error("Unable to generate token", err);
    });
    let hashed = await bcrypt.hash(token, 10).catch((err) => {
      throw new Error("Error hashing password", err);
    });
    try {
      const { data } = await context.app
        .service("users")
        .find({ query: { email: value } })
        .catch((err) => {
          throw new Error("Unable to find user ", err);
        });
      if (data && data.length == 1) {
        await context.app
          .service("users")
          .patch(data[0]._id, { magic: hashed })
          .catch((err) => {
            throw new Error("Unable to patch user", err);
          });
      } else {
        await context.app
          .service("users")
          .create({ email: value, magic: hashed })
          .catch((err) => {
            throw new Error("Unable to create user", err);
          });
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      let link = getTokenLink(token, value, context.app);
      context.app.service("mailer").create({
        from: "ford20@ethereal.com",
        to: value,
        subject: "Verify your email address",
        html: `<h4>Click the following link to continue</h4>
              <p>Ignore this email if you did not request it.</p>
              <a href="${link}">${link}</a>`,
      });

      if (context.data.type === "first" && context.data.visa) {
        context.app.service("visa").create(context.data.visa).catch(err=> {throw new Error(err);});
      }
    }

    context.result = {
      message: "A login link has been sent to your email",
      email: value,
      code: 201,
    };

    return context;
  };
};

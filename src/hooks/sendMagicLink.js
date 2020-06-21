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
    const { error, value } = await validateEmail.validate(
      context.data.email.trim()
    );
    if (error) {
      throw new BadRequest("Email is invalid");
    }

    let token = await getLongToken(16).catch((err) => {
      throw new Error("Unable to generate token", err);
    });
    let hashed = await bcrypt.hash(token, 10).catch(err=> {throw new Error("Error hashing password", err);});
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
      let link = getTokenLink(token, context.app);
      await context.app
        .service("mailer")
        .create({
          from: "ford20@ethereal.com",
          to: value,
          subject: "Magin login link",
          html: `<h4>Click the following link to login</h4>
              <p>Ignore this email if you did not attempt login.</p>
              <a href="${link}">${link}</a>`,
        })
        .catch((err) => {
          throw new Error(err);
        });
    }

    context.result = {
      message: "A login link has been sent to your email",
      email: value,
      code: 201,
    };

    return context;
  };
};

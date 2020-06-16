const { MethodNotAllowed, BadRequest } = require("@feathersjs/errors");
const { disallow } = require("feathers-hooks-common");
const { Verify } = require("./verify.class");

module.exports = {
  before: {
    all: [
      disallow("external"),
      async (context) => {
        // Disallow unused database adapters
        const allowedMethods = ["get", "patch", "create", "remove", "find"];
        if (!allowedMethods.includes(context.method)) {
          context.result = new MethodNotAllowed(
            "Operation not allowed on this service"
          );
        }
        return context;
      },
    ],
    find: [],
    get: [],
    create: [
      async (context) => {
        if (!(context.data.visa || context.data.email)) {
          context.result = new BadRequest(
            "Some parameters are missing or incorrect"
          );
        }
        return context;
      },
    ],
    update: [],
    patch: [
      async (context) => {
        context.data.updatedAt = Date.now();
        return context;
      },
    ],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      (context) => {
        setTimeout(() => {
          context.app
            .service("verify")
            .patch(context.result._id, { invalid: true, expired: true });
        }, Verify.options().maxAge);
      },
      async (context) => {
        context.app
          .service("mailer")
          .create({
            to: context.result.email,
            subject: "Email verification code",
            text: `Your email verification code is: ${context.result.verifyToken}`,
            from: "ford20@ethereal.com",
          });
        context.dispatch = { message: "verification email sent" };
        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

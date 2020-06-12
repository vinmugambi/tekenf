const { MethodNotAllowed, BadRequest } = require("@feathersjs/errors");
// const {disallow}=require("feathers-hooks-common");
const { Verify } = require("./verify.class");

const email = require("../../hooks/email");

module.exports = {
  before: {
    all: [
      // disallow('external'),
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
        await email(
          context.result.email,
          "Email verification code",
          `Your email verification code is: ${context.result.verifyToken}`
        );
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

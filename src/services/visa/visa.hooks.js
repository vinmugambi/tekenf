const { authenticate } = require("@feathersjs/authentication").hooks;
const validate = require("../../hooks/validate");
const verifyEmail = require("../../hooks/verifyEmail");
const allowAnonymous = require("../../hooks/allowAnonymous");

module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    all: [
      allowAnonymous(),
      authenticate("jwt", "anonymous"),
      (context) => {
        console.log(context.params);
        return context;
      },
    ],
    find: [],
    get: [],
    create: [validate()],
    update: [],
    patch: [verifyEmail()],
    remove: [],
  },

  after: {
    // all: [populateUser()],
    find: [],
    get: [],
    create: [
      async (context) => {
        context.app
          .service("verify")
          .create({ visa: context.result._id, email: context.result.email });
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

const { authenticate } = require("@feathersjs/authentication").hooks;
const {
  iff,
  isProvider,
  preventChanges,
  when} = require("feathers-hooks-common");
const {
  hashPassword, protect
} = require("@feathersjs/authentication-local").hooks;

const preventVerificationPropertyChanges = iff(
  isProvider("external"),
  preventChanges(
    "isVerified",
    "verifyToken",
    "verifyShortToken",
    "verifyExpires",
    "verifyChanges",
    "resetToken",
    "resetShortToken",
    "resetExpires"
  )
);

const restrict = [authenticate("jwt")];

module.exports = {
  before: {
    all: [],
    // find: [...restrict],
    get: [...restrict],
    create: [
      async (context) => {
        context.data = { ...context.data, password: "GeneratedPassword" };
        return context;
      },
      hashPassword("magic"),
    ],
    update: [...restrict, preventVerificationPropertyChanges],
    patch: [...restrict, preventVerificationPropertyChanges],
    remove: [...restrict],
  },

  after: {
    all: [when((hook) => hook.params.provider, 
      protect("password","magic")
    )],
    find: [],
    get: [iff(isProvider("external"))],
    create: [],
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

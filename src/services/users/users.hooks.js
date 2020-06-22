const { authenticate } = require("@feathersjs/authentication").hooks;
const { iff, isProvider, when } = require("feathers-hooks-common");
const {
  hashPassword,
  protect,
} = require("@feathersjs/authentication-local").hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [hashPassword("password")],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },
  after: {
    all: [when((hook) => hook.params.provider, protect("password", "magic"))],
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

const { authenticate } = require("@feathersjs/authentication").hooks;
const allowAnonymous = require("../../hooks/allowAnonymous");

module.exports = {
  before: {
    all: [
      allowAnonymous(),
      authenticate("jwt", "link"),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
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

const { authenticate } = require("@feathersjs/authentication").hooks;
const {disallow,iff, isProvider, setNow, discard } = require("feathers-hooks-common");
const {
  hashPassword,
  protect,
} = require("@feathersjs/authentication-local").hooks;


const preventChangesIfExternal = iff(isProvider("external"), discard("password", "magic","createdAt","updatedAt", "isAdmin"));

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [hashPassword("password"), setNow("createdAt")],
    update: [disallow],
    patch: [hashPassword("password"), authenticate("jwt"), preventChangesIfExternal, setNow("updatedAt")],
    remove: [authenticate("jwt"), iff(context => !context.params.user.isAdmin, disallow())],
  },
  after: {
    all: [protect("password", "magic")],
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

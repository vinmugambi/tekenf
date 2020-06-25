const { authenticate } = require("@feathersjs/authentication").hooks;
const { setField } = require("feathers-authentication-hooks");
const { disallow } = require("feathers-hooks-common");

const setApplicant = setField({
  from: "params.user.email",
  as: "data.applicant",
});
const limitToOwner = setField({
  from: "params.user.email",
  as: "params.query.applicant",
});

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [limitToOwner],
    get: [limitToOwner],
    create: [setApplicant, disallow("external")],
    update: [limitToOwner],
    patch: [limitToOwner],
    remove: [limitToOwner],
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

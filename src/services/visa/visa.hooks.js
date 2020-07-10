const { authenticate } = require("@feathersjs/authentication").hooks;
const { setField } = require("feathers-authentication-hooks");
const { isProvider, setNow, iff, disallow } = require("feathers-hooks-common");

const setApplicant = iff(
  isProvider("external"),
  setField({
    from: "params.user._id",
    as: "data.applicant",
  })
);

const limitToOwner = setField({
  from: "params.user._id",
  as: "params.query.applicant",
});

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [limitToOwner],
    get: [limitToOwner],
    create: [setApplicant, setNow("createdAt")],
    update: [disallow],
    patch: [limitToOwner, setNow("updatedAt")],
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

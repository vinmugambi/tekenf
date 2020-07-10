const { authenticate } = require("@feathersjs/authentication").hooks;
const { setField } = require("feathers-authentication-hooks");
const {setNow}= require("feathers-hooks-common");

const setOwner = setField({
  from: "params.user._id",
  as: "data.owner",
});
const limitToOwner = setField({
  from: "params.user._id",
  as: "params.query.owner",
});

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [limitToOwner],
    get: [limitToOwner],
    create: [
      setOwner,
      setNow("createdAt")
    ],
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

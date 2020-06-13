// const { authenticate } = require('@feathersjs/authentication').hooks;
const validate = require("../../hooks/validate");
const verifyEmail = require("../../hooks/verifyEmail");
const sendApplicationId = require("../../hooks/sendApplicationId");

module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    all: [],
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
    patch: [sendApplicationId()],
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

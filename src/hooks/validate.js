const Joi = require("@hapi/joi");
const { BadRequest } = require("@feathersjs/errors");

// Create a joi validation schema
const application = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});
//  Trim data to avoid unexpected validation errors
const trimmed = (data) => {
  let clean = {};
  Object.keys(data).forEach((key) => (clean[key] = data[key].trim()));
  return clean;
};

module.exports = () => {
  return async (context) => {
    const { error, value } = application.validate(trimmed(context.data));
    if (error) {
      context.result = new BadRequest("Email must be provided");
      return context;
    }
    context.data = {
      ...value,
      verified: false,
      createdAt: Date.now(),
    };
    return context;
  };
};

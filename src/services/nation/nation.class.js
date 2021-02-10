/* eslint-disable no-unused-vars */
const india = require("./india/india.js");
const criteria = require("./india/criteria.js");
const nations = {
  india,
  pakistan: "pakistan",
  criteria,
};
exports.Nation = class Nation {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return Object.keys(nations);
  }

  async get(id, params) {
    return nations[id];
  }
};

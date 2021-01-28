/* eslint-disable no-unused-vars */
const india = require("./india.js");
const nations = {
  india: india,
  pakistan: "pakistan",
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

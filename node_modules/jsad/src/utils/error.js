const util = require("util");
const _ = require("lodash");

module.exports = function ADError(errorName, errormessage) {
  Error.captureStackTrace(this, this.constructor);
  this.name = errorName;
  this.message = _.get(errormessage, "message");
};

util.inherits(module.exports, Error);

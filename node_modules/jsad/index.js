const _ = require("lodash");
const auth = require("./src/service/authenticate.service");
const profile = require("./src/service/profile.service");

const Connection = function(opts) {
  opts = _.defaults(opts || {}, {
    client_id: null,
    client_secret: null,
    tenent_id: null
  });
  self = _.assign(this, opts);

  // validations
  if (!_.isString(this.client_id))
    throw new Error("invalid or missing clientId");
  if (!_.isString(this.client_secret))
    throw new Error("invalid or missing client secret");
  if (!_.isString(this.tenent_id))
    throw new Error("invalid or missing tenent id");
};

Connection.prototype.authenticate = async function(username, password) {
  const opts = {
    client_id: this.client_id,
    client_secret: this.client_secret,
    tenent_id: this.tenent_id,
    username,
    password
  };
  return await auth.authenticate(opts);
};

Connection.prototype.revokeToken = async function(authObject) {
  const opts = {
    client_id: this.client_id,
    client_secret: this.client_secret,
    tenent_id: this.tenent_id,
    refresh_token: authObject.refresh_token
  };

  return await auth.revokeToken(opts);
};

Connection.prototype.getProfile = async function(authObject) {
  return profile.getProfile(authObject);
};

Connection.prototype.getProfilePermissionName = async function(authObject) {
  return profile.getProfilePermissionName(authObject);
};

module.exports.createConnection = function(opts) {
  return new Connection(opts);
};

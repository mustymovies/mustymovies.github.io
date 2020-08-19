const { oauth } = require("../api/authentication.api");
const ADError = require("../utils/error");

exports.authenticate = async function(opts) {
  const body = {
    client_id: opts.client_id,
    client_secret: opts.client_secret,
    grant_type: "password",
    username: opts.username,
    password: opts.password,
    scope: "user.read offline_access"
  };
  try {
    const response = await oauth(body, opts.tenent_id);
    return response.json();
  } catch (error) {
    throw new ADError("Authentication Error", error);
  }
};

exports.revokeToken = async function(opts) {
  const body = {
    client_id: opts.client_id,
    client_secret: opts.client_secret,
    grant_type: "refresh_token",
    refresh_token: opts.refresh_token
  };
  try {
    const response = await oauth(body, opts.tenent_id);
    return response.json();
  } catch (error) {
    throw new ADError("Revoke Token Error", error);
  }
};

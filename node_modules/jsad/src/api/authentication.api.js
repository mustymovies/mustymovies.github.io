const fetch = require("node-fetch");
const qs = require("qs");
const { AUTH_HEADER } = require("../constants");

exports.oauth = async function(body, tenent_id) {
  const oauthUrl = `https://login.microsoftonline.com/${tenent_id}/oauth2/v2.0/token`;

  return await fetch(oauthUrl, {
    method: "POST",
    headers: AUTH_HEADER,
    body: qs.stringify(body)
  });
};

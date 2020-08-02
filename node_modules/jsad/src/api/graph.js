const fetch = require("node-fetch");

const { GRAPH_HEADER } = require("../constants");

exports.getGraph = async function(authentication, urlparams) {
  const url = `https://graph.microsoft.com/v1.0/me/${urlparams}`;
  const header = Object.assign(GRAPH_HEADER, {
    Authorization: `Bearer ${authentication.access_token}`
  });

  return await fetch(url, {
    method: "GET",
    headers: header
  });
};

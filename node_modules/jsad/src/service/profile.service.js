const { get } = require("lodash");
const { getGraph } = require("../api/graph");
const ADError = require("../utils/error");

exports.getProfile = async function(authObject) {
  try {
    const response = await getGraph(authObject, "");
    return response.json();
  } catch (error) {
    throw new ADError("Get Profile Error", error);
  }
};

exports.getProfilePermissionName = async function(authObject) {
  try {
    const response = await getGraph(authObject, "onpremisessamaccountname");
    return get(response, "value");
  } catch (error) {
    throw new ADError("Get Profile Permission Name Error", error);
  }
};

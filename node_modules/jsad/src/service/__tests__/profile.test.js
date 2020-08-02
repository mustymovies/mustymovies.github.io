jest.mock("node-fetch");

const fetch = require("node-fetch");
const { getProfile, getProfilePermissionName } = require("../profile.service");
const { GRAPH_HEADER } = require("../../constants");
const ADError = require("../../utils/error");

const authObject = {
  access_token: "abcd1234"
};

const header = Object.assign(GRAPH_HEADER, {
  Authorization: `Bearer ${authObject.access_token}`
});

describe("service/profile.service getProfile", () => {
  it("should return correct profile object", async () => {
    fetch.mockResolvedValue({ json: jest.fn(() => ({})) });
    const response = await getProfile(authObject);

    expect(fetch).toHaveBeenCalledWith("https://graph.microsoft.com/v1.0/me/", {
      method: "GET",
      headers: header
    });

    expect(response).toEqual({});
  });

  it("should throw error", async () => {
    fetch.mockRejectedValue({
      json: jest.fn(() => ({})),
      message: "Test Profile Error"
    });

    try {
      await getProfile(authObject);
    } catch (error) {
      expect(fetch).toHaveBeenCalledWith(
        "https://graph.microsoft.com/v1.0/me/",
        {
          method: "GET",
          headers: header
        }
      );
      expect(error).toEqual(
        new ADError("Get Profile Error", {
          message: "Test Profile Error"
        })
      );
    }
  });
});

describe("service/profile.service getProfilePermissionName", () => {
  it("should return correct name", async () => {
    fetch.mockResolvedValue({ value: "dummyName" });
    const response = await getProfilePermissionName(authObject);

    expect(fetch).toHaveBeenCalledWith(
      "https://graph.microsoft.com/v1.0/me/onpremisessamaccountname",
      {
        method: "GET",
        headers: header
      }
    );

    expect(response).toEqual("dummyName");
  });

  it("should throw error", async () => {
    fetch.mockRejectedValue({
      message: "Test Profile Name Error"
    });

    try {
      await getProfilePermissionName(authObject);
    } catch (error) {
      expect(fetch).toHaveBeenCalledWith(
        "https://graph.microsoft.com/v1.0/me/onpremisessamaccountname",
        {
          method: "GET",
          headers: header
        }
      );
      expect(error).toEqual(
        new ADError("Get Profile Permission Name Error", {
          message: "Test Profile Name Error"
        })
      );
    }
  });
});

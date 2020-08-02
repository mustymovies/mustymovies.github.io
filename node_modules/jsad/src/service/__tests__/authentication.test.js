jest.mock("node-fetch");

const fetch = require("node-fetch");
const qs = require("qs");
const ADError = require("../../utils/error");
const { AUTH_HEADER } = require("../../constants");
const { authenticate, revokeToken } = require("../authenticate.service");

const dummyOpts = {
  client_id: "12345",
  client_secret: "12345",
  tenent_id: "12345",
  username: "abc",
  password: "abc",
  refresh_token: "12345"
};

describe("service/authentication.service authenticate", () => {
  it("return correct auth object", async () => {
    fetch.mockResolvedValue({ json: jest.fn(() => ({})) });

    const auth = await authenticate(dummyOpts);

    expect(fetch).toHaveBeenCalledWith(
      "https://login.microsoftonline.com/12345/oauth2/v2.0/token",
      {
        method: "POST",
        headers: AUTH_HEADER,
        body: qs.stringify({
          client_id: dummyOpts.client_id,
          client_secret: dummyOpts.client_secret,
          grant_type: "password",
          username: dummyOpts.username,
          password: dummyOpts.password,
          scope: "user.read offline_access"
        })
      }
    );
    expect(auth).toEqual({});
  });

  it("return error", async () => {
    fetch.mockRejectedValue({
      json: jest.fn(() => ({})),
      message: "Test Auth Error"
    });

    try {
      await authenticate(dummyOpts);
    } catch (error) {
      expect(fetch).toHaveBeenCalledWith(
        "https://login.microsoftonline.com/12345/oauth2/v2.0/token",
        {
          method: "POST",
          headers: AUTH_HEADER,
          body: qs.stringify({
            client_id: dummyOpts.client_id,
            client_secret: dummyOpts.client_secret,
            grant_type: "password",
            username: dummyOpts.username,
            password: dummyOpts.password,
            scope: "user.read offline_access"
          })
        }
      );
      expect(error).toEqual(
        new ADError("Authentication Error", {
          message: "Test Auth Error"
        })
      );
    }
  });
});

describe("service/authentication.service revokeToken", () => {
  it("return correct auth object", async () => {
    fetch.mockResolvedValue({ json: jest.fn(() => ({})) });

    const auth = await revokeToken(dummyOpts);

    expect(fetch).toHaveBeenCalledWith(
      "https://login.microsoftonline.com/12345/oauth2/v2.0/token",
      {
        method: "POST",
        headers: AUTH_HEADER,
        body: qs.stringify({
          client_id: dummyOpts.client_id,
          client_secret: dummyOpts.client_secret,
          grant_type: "refresh_token",
          refresh_token: dummyOpts.refresh_token
        })
      }
    );
    expect(auth).toEqual({});
  });

  it("return error", async () => {
    fetch.mockRejectedValue({
      json: jest.fn(() => ({})),
      message: "Test Revoke Token Error"
    });

    try {
      await authenticate(dummyOpts);
    } catch (error) {
      expect(fetch).toHaveBeenCalledWith(
        "https://login.microsoftonline.com/12345/oauth2/v2.0/token",
        {
          method: "POST",
          headers: AUTH_HEADER,
          body: qs.stringify({
            client_id: dummyOpts.client_id,
            client_secret: dummyOpts.client_secret,
            grant_type: "refresh_token",
            refresh_token: dummyOpts.refresh_token
          })
        }
      );
      expect(error).toEqual(
        new ADError("Revoke Token Error", {
          message: "Test Revoke Token Error"
        })
      );
    }
  });
});

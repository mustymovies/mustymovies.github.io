# JSAD - Active Directory Library

Open Source Node js library for microsoft active directory

## installation

by npm :
`npm install jsad`

by yarn :
`yarn add jsad`

## Create Connection

Create Active Directory Connection.

```
const connection = jsAD.createConnection({
  client_id: <AD_CLIENT_ID>,
  client_secret: <AD_CLIENT_SECRET>,
  tenent_id: <TENENT_ID>
});

```

## Usage

### Aauthentication

Authenticate function can authenticate using username and password

```
const auth = await connection.authenticate(
      username,
      password
    );

```

### Revoke Token

AD client token will expires the 3600 s and this will reauthenticate by the refresh token given by authentication

```
const reauth = await connection.revokeToken(auth);

```

### Get Profile Information

Get profile information of logged user.

```
const profile = await connection.getProfile(auth);
```

### Get Profile Name

Get permitted profile name of logged user

```
const profilename = await connection.getProfilePermissionName(auth);
```

## Methods

1. authenticate(username,password): return auth response
2. refreshByToken(refreshToken: refresh token in auth object): auth response
3. getProfileInfo(auth: authentication object): return profile information object
4. getProfilePermissionName(auth: authentication object): return permitted profile name

## Resources

https://docs.microsoft.com/en-us/azure/active-directory/develop/

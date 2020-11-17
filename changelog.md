# Rhoades Backend

## Version 0.19.0

- Implemented:
  - Securing error messages.
- TODO:
  - Implement single use token.

## Version 0.18.0

- Implemented:
  - One route has been secured for testing purposes.
- TODO:
  - Implement single use token.

## Version 0.17.0

- Implemented:
  - Access token on login.
- TODO:
  - Implement single use token.

## Version 0.16.0

- Implemented:
  - Access token on registration.
- TODO:
  - Implement single use token.

## Version 0.15.8

- Fixed:
  - Removed condition from query of `list/getListsOfUser/:id` route.
- TODO:
  - Implement single use token.

## Version 0.15.7

- Fixed:
  - Documentation from the following endpoints: `user/enroll/:code`, `list/createList` and `list/getListsOfUser/:id`.
  - `changelog.md` file.
- TODO:
  - Implement single use token.

## Version 0.15.6

- Fixed:
  - Removed type from body of `user/enroll/:code` route.
- TODO:
  - Implement single use token.

## Version 0.15.5

- Fixed:
  - Removed condition from from query of `user/enroll/:code` route.
- TODO:
  - Implement single use token.

## Version 0.15.4

- Fixed:
  - Removed condition from query of the `user/notify` route.
- TODO:
  - Implement single use token.

## Version 0.15.3

- Fixed:
  - Error 422 in the route `user/verify/:code?documentType=[0,1]`.
- TODO:
  - Implement single use token.

## Version 0.15.2

- Fixed:
  - Standardization of response objects, strings are no longer allowed.
- TODO:
  - Implement single use token.

## Version 0.15.1

- Fixed:
  - Removed `condition` from query params in the `verify endpoint`.
- TODO:
  - Implement single use token.

## Version 0.15.0

- Implemented:
  - [`joi`](https://www.npmjs.com/package/joi) to validate requests.
- TODO:
  - Implement single use token.

## Version 0.14.0

- Implemented:
  - `ìndex.ts` file in almost each folder to standardize imports.
  - [`http-errors`](https://www.npmjs.com/package/http-errors) in every single route improve our error handle.
- Fixed:
  - `changelog.md`.
- TODO:
  - To implement [`joi`](https://www.npmjs.com/package/joi) to validate requests.

## Version 0.13.0

- Implemented:
  - `ìndex.ts` file in almost each folder to standardize imports.
- TODO:
  - To implement [`http-errors`](https://www.npmjs.com/package/http-errors) in every single route improve our error handle.
  - To implement [`joi`](https://www.npmjs.com/package/joi) to validate requests.

## Version 0.12.0

- Implemented:
  - Validation info that comes from a request in the auth route.
- Fixed:
  - Error handle.
- TODO:
  - To implement [`http-errors`](https://www.npmjs.com/package/http-errors) in every single route improve our error handle.
  - To implement [`joi`](https://www.npmjs.com/package/joi) to validate requests.

## Version 0.11.0

- Implemented:
  - New way to handle 404 error.
  - Route file to auth.

## Version 0.10.0

- Implemented:
  - Handling 404 error.

## Version 0.9.0

- Implemented:
  - Documentation in its own route using [`Swagger`](https://swagger.io/).

## Version 0.8.0

- Implemented:
  - Reworked the way to get data from the database, now everything will be obtained just from one collection, `users`.

## Version 0.7.2

- Fixed:
  - Custom `uid` int he user auth creation.

## Version 0.7.1

- Fixed:
  - The return of the `verify endpoint`.

## Version 0.7.0

- Implemented:
  - Returning responses without encryption.

## Version 0.6.0

- Implemented:
  - Users now are registered into `Firebase Authentication`.

## Version 0.5.0

- Implemented:
  - Get lists of a user endpoint.

## Version 0.4.1

- Fixed:
  - Endpoint to create lists, type is no longer required as argument in the body, instead a new query param (condition) has been added.
  - Endpoint to enroll users, type is no longer required as argument in the body, instead a new query param (condition) has been added.

## Version 0.4.0

- Implemented:
  - `cipher.final('hex')`.
  - [Documentation](https://github.com/AcecomFCUNI/rhoades-backend#readme).
  - Endpoint to create lists.
  - Endpoint to enroll users.

## Version 0.3.1

- Fixed:
  - Removed `cipher.final('hex')`.
  - Test content.

## Version 0.3.0

- Implemented:
  - The responses from the server are now encoded.

## Version 0.2.1

- Fixed:
  - Access control allow methods.

## Version 0.2.0

- Implemented:
  - Password generator.
  - Encryption of the password.
  - Endpoint to generate the password.
  - Notification to the user about the password.
  - `id` to the `DtoUser` and `IUser` interfaces.

## Version 0.1.0

- Project Initialization.
- Implemented:
  - Endpoint to validate if a user (student or teacher) exists or not.

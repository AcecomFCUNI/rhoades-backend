# Rhoades Backend

## Version 0.45.0

- Implemented:
  - Removed aws server url.

## Version 0.44.0

- Implemented:
  - Added faculty field to the response of the verify endpoint.

## Version 0.43.0

- Implemented:
  - New way to handle controllers errors.

## Version 0.42.1

- Fixed:
  - Changed from post to patch method.

## Version 0.42.0

- Implemented:
  - Endpoint to register the committee members with its corresponding documentation.

## Version 0.41.0

- Implemented:
  - Condition for the verify endpoint.

## Version 0.40.2

- Fixed:
  - Error 404 when a user that doesn't exists is trying to finish the registration of a list.

## Version 0.40.1

- Fixed:
  - Error 409 when a user was trying to enroll another list of a different type.

## Version 0.40.0

- Implemented:
  - Configuration for `aws`.

## Version 0.39.0

- Implemented:
  - Error 409 when a user is trying enroll another list of the same type.
  - Error 403 when a user is trying enroll a list from a different faculty than his.
- Updated:
  - Documentation for the `/list/createList` endpoint.
  - [`readme.md`](https://github.com/AcecomFCUNI/rhoades-backend#readme) file.
- Fixed:
  - Error messages.
  - `changelog.md` file.
  - Documentation

## Version 0.38.0

- Implemented:
  - Endpoint to filter lists by faculty and type.
- Fixed:
  - `changelog.md` file.

## Version 0.37.0

- Implemented:
  - Notification when a user without email is trying to register into the system.
- TODO:
  - Implement endpoint to filter lists by faculty and type.

## Version 0.36.0

- Implemented:
  - Refactor error catching.
- TODO:
  - Notification to CEUNI when a user does not have email.

## Version 0.35.0

- Implemented:
  - Changed error 401 for 403 in the finish registration route.
- TODO:
  - Refactor error catching.

## Version 0.34.0

- Implemented:
  - Validating posible errors when a user tries to create a list.
- TODO:
  - Refactor error catching.

## Version 0.33.0

- Implemented:
  - Validating that the owner can't register himself into his lists.
- TODO:
  - Refactor error catching.

## Version 0.32.0

- Implemented:
  - Validating that only an owner can enroll users into a list.
- TODO:
  - Refactor error catching.

## Version 0.31.0

- Implemented:
  - 201 code for the creation list endpoint.
- TODO:
  - Verify if the user who is trying to modify a list is the owner.

## Version 0.30.0

- Implemented:
  - Field faculty for those lists who need it.
- TODO:
  - Implement 2XX correct codes.
- Fixed:
  - `changelog.md`.

## Version 0.29.0

- Implemented:
  - Remove `university-council` from available positions to apply.
- TODO:
  - Implement field faculty for those list who need it.
- Fixed:
  - `changelog.md`.

## Version 0.28.0

- Implemented:
  - Notifications when a list completes its registration.
- TODO:
  - Implement field faculty for those list who need it.- Remove `university-council` from available positions to apply.
- Fixed:
  - `changelog.md`.

## Version 0.27.0

- Implemented:
  - Endpoint to finish the registration of the list.
- TODO:
  - Implement notifications when a list completes its registration.

## Version 0.26.0

- Implemented:
  - Added field `gender` to the verify endpoint, it will be null if there is no gender registered.
- TODO:
  - Implement notifications when a list completes its registration.

## Version 0.25.0

- Implemented:
  - Added field `closed` to the list, it is false if the list is not completely registered (more users can be registered on it).
- TODO:
  - Implement notifications when a list completes its registration.

## Version 0.24.0

- Implemented:
  - Specifics `joi` validation schemas for the requests content.
- TODO:
  - Implement notifications when a list is registered and when a list completes its registration.

## Version 0.23.0

- Implemented:
  - Notification when a user is registered as procurator.
  - Gender field to use the notify endpoint.
- TODO:
  - Implement notifications when a list is registered and when a list completes its registration.

## Version 0.22.0

- Implemented:
  - Removing redis database temporally.
- TODO:
  - Implement notifications.

## Version 0.21.0

- Implemented:
  - Implement single use token.
  - Redis connection for local and development.
- TODO:
  - Secure all the private routes.

## Version 0.20.0

- Implemented:
  - Refresh token.
- TODO:
  - Implement single use token.

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
  - Documentation of the following endpoints: `user/enroll/:code`, `list/createList` and `list/getListsOfUser/:id`.
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

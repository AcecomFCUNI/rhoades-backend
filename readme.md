# Rhoades Backend

Backend for the application to automatize the registration of lists.

## Prerequisites

- You need to have [`Node.js`](https://nodejs.org/en/) and [`Yarn`](https://yarnpkg.com/) installed.
- You need an `.env` file in order to run this project. Here is an example of its content:

```bash
# Firebase config
GOOGLE_APPLICATION_CREDENTIALS =
FIREBASE_AUTH_PROVIDER_X509_CERT_URL =
FIREBASE_AUTH_URI =
FIREBASE_CLIENT_EMAIL =
FIREBASE_CLIENT_ID =
FIREBASE_TYPE =
FIREBASE_PRIVATE_KEY_ID =
FIREBASE_PRIVATE_KEY =
FIREBASE_PROJECT_ID = rhoades
FIREBASE_TOKEN_URI =
FIREBASE_URL =
FIREBASE_X509_CERT_URL =

# Security
ALGORITHM =
KEY =
KEY_PASSWORD =
KEY_JSON =
IV =

# Mail
EMAIL_PASSWORD =
EMAIL_SENDER =
```

## Setup

In order to install and use this project (in development mode), please run the following commands in your terminal:

```bash
yarn
yarn service
```

You will a message as follows:

```bash
yarn run v1.22.4
$ nodemon
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): .env src/**/*
[nodemon] watching extensions: ts
[nodemon] starting `ts-node -r dotenv/config ./src/index`
Server running at port XXXX.
Firebase connection established.
```

## Usage

- All the endpoints begins in `/api`, except `home`.

There are sixteen endpoints implemented:

1. Home: `/`, it has a get method. It is only decorative.
2. Verify user: `/user/verify/:code?condition=&documentType=`, it has a get method which will verify whether a user can be a spokesperson or not.

   - The `code` must be the document number the user has selected.

   - The `condition` must be `student` or `teacher`.

   - The `documentType` must be 0 (DNI, CE or others) or 1 (UNI code).

   - If everything is correct you will get a [success response](#success), if not, an [error response](#error). Also, consider this for all the incoming endpoints.

   - The encrypted response will contains the following `JSON`:
     ```json
     {
       "lastName": "LUZQUIÑOS",
       "specialty": "N6",
       "names": "STEVE ANTHONY",
       "secondLastName": "AGAMA",
       "mail": "sluzquinosa@uni.pe",
       "optionalMail": "",
       "documentNumber": "77073848",
       "faculty": "FC",
       "UNICode": "20140118I",
       "documentType": "DNI"
     }
     ```

3. Notify user: `/user/notify?condition=`, is has a patch method which will create a password for the user and send it to the user's email.

   - The body of the request must be as follows:

     ```json
     {
       "args": {
         "id": "QnYUvCKk74N3vfJZSHxW (id user)"
       }
     }
     ```

   - The encrypted response will contains the following message:

     ```
     Se ha generado su contraseña correctamente y ha sido enviada a su correo
     ```

4. Enroll user in a list: `/user/enroll/:code?documentType=`, it has a post method which will enroll a user into a list, if he is able to postulate.

   - The body of the request must be as follows:

     ```json
     {
       "id": "xiaphgU3T9Atd1OlrCfm (id list)",
       "type": "student or teacher"
     }
     ```

   - The encrypted response will contains the following `JSON`:
     ```json
     {
       "id": "LUZQUIÑOS",
       "specialty": "N6",
       "names": "STEVE ANTHONY",
       "secondLastName": "AGAMA",
       "mail": "sluzquinosa@uni.pe",
       "optionalMail": "",
       "documentNumber": "77073848",
       "faculty": "FC",
       "UNICode": "20140118I",
       "documentType": "DNI"
     }
     ```

5. Create a list: `/list/createList`, it has a post method which will create a list that will be represented by the spokesperson who has performed the request.

   - The body of the request must be as follows:

     ```json
     {
       "owner": "QnYUvCKk74N3vfJZSHxW (id user)",
       "type": "universitary-third"
     }
     ```

   - The encrypted response will contains the following `JSON`:

     ```json
     {
       "applicants": [],
       "id": "RqezH0q4leKxysebcfwa",
       "owner": "QnYUvCKk74N3vfJZSHxW",
       "type": "universitary-third"
     }
     ```

### Notes

- <a id="success"></a>In case of success you will get a generic success response as follows, with a 200 code:

```json
{
  "error": false,
  "message": "encrypted-response-message"
}
```

- <a id="error"></a>In case of error you will get a generic error response as follows, with a 500 error code:

```json
{
  "error": true,
  "message": "Error message"
}
```

## Authors:

- **Anthony Luzquiños** - _Initial Work_ - _Database_ - _Deployment_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).

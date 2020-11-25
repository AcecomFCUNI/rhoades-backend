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
EMAIL_RECEIVER =
EMAIL_SENDER =

# Front
RHOADES_FRONT_URL =

# Mode
MODE =
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
- Home: `/`, it has a get method. It is only decorative.

There are several endpoints, please check the `/api/docs` route to check the documentation of the others.

## Authors:

- **Anthony Luzquiños** - _Initial Work_ - _Database_ - _Deployment_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).

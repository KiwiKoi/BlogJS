"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  SQL_SERVER,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD,
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";
assert(PORT, "PORT is required");
assert(HOST, "HOST is required");
assert(HOST_URL, "HOST_URL is required");
assert(SQL_SERVER, "SQL_SERVER is required");
assert(SQL_DATABASE, "SQL_DATABASE is required");
assert(SQL_USER, "SQL_USER is required");
assert(SQL_PASSWORD, "SQL_PASSWORD is required");

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  sqlprops: {
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    options: {
      encrypt: sqlEncrypt,
      enableArithAbort: true,
    },
  },
};

const functions = require('firebase-functions');
const express = require('express');
const compression = require('compression');

// We have to import the built version of the server middleware.
const { sapper } = require('./__sapper__/build/server/server');

const app = express().use(
    compression({ threshold: 0 }), // compress everything
    sapper.middleware()
);

exports.ssr = functions.https.onRequest(app);
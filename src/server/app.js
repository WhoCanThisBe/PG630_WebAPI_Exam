// require/import dotenv as early as possible (therefore it's placed here)
require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

// Server static content from parcel-dist bundle
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.use((req, res, done) => {
  // Don't serve the index.html file if the request is not a GET-request, and is for our own REST API routes
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    done();
  }
});

module.exports = app;

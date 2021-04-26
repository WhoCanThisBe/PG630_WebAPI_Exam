// require/import dotenv as early as possible (therefore it's placed here)
require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const authApi = require("./routes/auth-api");
const passport = require("passport");
const { verifyUser } = require("./db/users");
const { getUser } = require("./db/users");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

//JSON body parse without bodyparser
app.use(express.json());

// Express session
app.use(
  session({
    secret: "dasssfdf",
    resave: false,
    saveUninitialized: false,
  })
);

const authFields = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(authFields, (userId, password, done) => {
    if (verifyUser(userId, password)) {
      done(null, getUser(userId));
    } else {
      done(null, false, { message: "Invalid username/password" });
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = getUser(id);
  done(null, user ? user : null);
});

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api", authApi);

// Server static content from parcel-dist bundle
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.use((req, res, next) => {
  // Don't serve the index.html file if the request is not a GET-request, and is for our own REST API routes
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    // Go to the next middleware in the stack
    next();
  }
});

module.exports = app;

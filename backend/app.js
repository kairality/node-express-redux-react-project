const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ValidationError } = require("sequelize");

// internal requires
const routes = require("./routes");

// this variable is initialized from the env file
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

// log info in dev environment
app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());

// use cors in development
if (!isProduction) {
  app.use(cors());
}

// helmet - for setting headers to secure the app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// csrf
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        }
    })
);

// use all of our routes
app.use(routes);

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  // next with an error invokes following error handling middlewares
  // next with no error does NOT invoke following middleweares
  next(err);
});

// handle sequelize errors of type ValidationError
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Format errors
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

// export time!
module.exports = app;

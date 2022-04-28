const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

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
    csrf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        }
    })
);

// use all of our routes
app.use(routes);

// export time!
module.exports = app;

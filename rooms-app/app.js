// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "rooms-app";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

const isLoggedIn = require("./middleware/isLoggedIn");
const exposeUser = require("./middleware/exposeUserToViews")

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", exposeUser, index);




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

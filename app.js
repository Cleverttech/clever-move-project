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
hbs.registerPartials('./views/partials');
hbs.registerHelper('isdefined',(value)=>{
    return value == 'declined' || value == 'accepted' ? true : false;
});
hbs.registerHelper('isAdmin',(value)=>{
    return value == 'admin';
});
hbs.registerHelper('isUser',(value)=>{
    return value == 'user';
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "clever-move-project";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `Clever Move`;

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: process.env.SESSION_KEY,
    cookie:{
        maxAge: 24 * 60 * 60 * 1000 // in milliseconds
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/clever-move-project',
        ttl: 24 * 60 * 60 * 1000//1day => seconds
    })
}));

//set global variable to check if user is logged in
// app.use((req, res, next)=>{
// //to convert to boolean
//  req.app.locals.isLoggedIn = !!req.session.userInfo
// })

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);

const adminRoutes = require('./routes/admin-routes');
app.use('/', adminRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/', userRoutes);

const scheduleRoutes = require('./routes/schedule-routes');
app.use('/', scheduleRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

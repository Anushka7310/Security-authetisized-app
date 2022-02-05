const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

///////initialize passport to use and create session/////
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

//to hash and save our passwords and to save it in mongoose database/////
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

///passport local configuration ,
///serialise cretaes the fortune cookie and  stuffs the messag namely user's identification into the cookkie
///and deserialize allows passport scrubles the cookie and basically allow to check who the user is and all identification so that we can autheticate them on our server.
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
  }
});
app.post("/register", function (req, res) {});

app.post("/login", function (req, res) {});
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});

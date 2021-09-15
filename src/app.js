const express = require("express");
const passport = require("passport");
const app = express();
const index = require("./routes/index");
const discord = require("./stratigies/discordStrategy");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

mongoose.connect("mongodb+srv://XxNAVxX:icandab1@navs-db.jlmpj.mongodb.net/discord-dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
 
app.use(session({
  secret: "secret",
  cookie: {
    maxAge: 60000 * 60 *24 
  },
  resave: false,
  saveUninitialized: false
}));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(passport.initialize())
app.use(passport.session());

app.use('/api', index);

app.listen(3001, () => {
  console.log("On port something smh");
});
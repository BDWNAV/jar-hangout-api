const passport = require("passport");
const DiscordStrategy = require("passport-discord");
const User = require("../models/User");
const config = require("../config").discordInfo;

passport.serializeUser((user, done) => {
  done(null, user.discordId);
});

passport.deserializeUser(async (discordId, done) => {
  try {
    const user = await User.findOne({ discordId });
    return user ? done(null, user) : done(null, null);
  } catch (error) {
    console.log(error);
    done(err, null);
  }
})

passport.use(new DiscordStrategy({
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: "http://localhost:3001/api/auth/discord/redirect",
  scope: ["identify"]
}, async (accessToken, refreshToken, profile, done) => {
  console.log(profile);

  try {
    const findUser = await User.findOneAndUpdate({ discordId: profile.id }, {
      username: profile.username,
      discriminator: profile.discriminator
    }, { new: true });
  
    if(findUser) {
      console.log("The user was found.");
      return done(null, findUser);
    } else {
      const newUser = await User.create({
        discordId: profile.id,
        username: profile.username,
        discriminator: profile.discriminator
      });
  
      return done(null, newUser);
    }
  } catch (error) {
    console.log(error);
    return done(err, null)
  }
}));
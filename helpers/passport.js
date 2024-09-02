const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user.model'); // Replace with your User model
const bcrypt = require('bcrypt')


passport.use(new LocalStrategy( 
  { usernameField: 'email' },   
  async function(email, password, done) { 
    try { 
      const user = await User.findOne({ email: email }).exec(); // Use .exec() to return a Promise 
      if (!user) { 
        return done(null, false, { message: "Incorrect email" }); 
      } 
      const matchpass = await bcrypt.compare(password, user.password); 
      if (!matchpass) { 
        return done(null, false, { message: "Incorrect password" }); 
      } 
      return done(null, user); 
    } catch (err) { 
      return done(err); 
    } 
  } 
));

// Serialize and deserialize user (required for persistent sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

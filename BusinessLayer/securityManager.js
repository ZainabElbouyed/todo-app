const LocalStrategy = require('passport-local').Strategy;
const dao           = require('../DaoLayer/dao');


function initializePassport(passport) {
  // Local Strategy for username/password authentication
  passport.use(new LocalStrategy( (username, password, done) => {
    const user = dao.findUser(username);
    if (!user) {
       return done(null, false, { message: 'Incorrect username.' });
    }

    if (user.password !== password) {
       return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
}));

// Serialize/Deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  const user = dao.findUserById(id);
  done(null, user);
});

}//end initializePassport()

function isAuthorizedUser(user) {
  return dao.userHasRole(user);
}//isAuthorizedUser()

//Other security services to be added here

 module.exports = {isAuthorizedUser, initializePassport};
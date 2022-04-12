const passport = require('passport');

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { Users } = require('../models');

const options = {

  jwtFromRequest: ExtractJwt.fromHeader('authorization'),

  secretOrKey: 'rahasia',
};

passport.use(new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await Users.findByPk(payload.id);

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

module.exports = passport;

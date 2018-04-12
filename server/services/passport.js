import passport from 'passport';
import User from '../models/users';
import {config} from 'dotenv';
import { Strategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
// Figure out a way I don't need to 
// require this everytime.
config();

/**
 * Defines local strategy for signin.
 * 
 * @param {object} localStrategy configuration object
 * @param {func} cb the callback function
 * 
 * @return {object | boolean} user if password is a match
 */
const localLogin = new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) return err;

    if (!user) {
      return done(false, null);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new Strategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
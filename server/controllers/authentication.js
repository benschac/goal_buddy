import User from '../models/users';
import jwt from 'jwt-simple';

/**
 * 
 * @param {object} user the user to generate JWT token for
 * 
 * @return {string} jwt token
 */
function tokenForUser(user) {
  const jwtConfig = {sub: user.id, iat: new Date().getTime()};
  return jwt.encode(jwtConfig, process.env.JWT_SECRET);
}

/**
 * Creates a new User and returns jwtToken
 * 
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {func} next the function to continue to the next piece of middleware
 * 
 * @return {object|string} jwtToken or error message
 */
export const signup = (req, res, next) => {
  const {email, password} = req.body;

  User.findOne({email}, (err, existingUser) => {

    if (err) return next(err);

    if (!email || !password) {
      return res.status('422').send('Must enter email and password');
    }

    if (existingUser) {
      return res.status('422').send('Email is in usage');
    }

    const user = new User({ email, password });

    user.save((err) => {
      if (err) return next(err);

      return res.json({token: tokenForUser(user)});
    });
  })
}

/**
 * 
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {func} next to pass to the next piece of middleware
 * 
 * @return {string} jwt token string if user from req object is in the db
 */
export const signin = (req, res, next) => {
  const {user} = req;
  res.send({token: tokenForUser(user)});
}
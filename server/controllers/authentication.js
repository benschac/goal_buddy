import User from '../models/users';
import jwt from 'jwt-simple';

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timeStamp}, process.env.JWT_SECRET);
}

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

export const signin = (req, res, next) => {
  const {user} = req;
  res.send({token: tokenForUser(user)});
}
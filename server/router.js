import {signup, signin} from './controllers/authentication';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false});

/**
 * 
 * @param {*} app 
 */
export default function(app) {
  // Protected route, need token or redirected
  app.get('/', requireAuth, (req, res) => res.send({message: 'code1234'}));

  // User sessions
  app.post('/signin', requireSignin, signin);
  app.post('/signup', signup);
}
import {signup, signin} from './controllers/authentication';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false});

export default function(app) {
  // Protected route, need token
  app.get('/', requireAuth, (req, res) => {
    res.send('hello you are in');
  });

  // get token
  app.post('/signin', requireSignin, signin);
  // get token
  app.post('/signup', signup);
}
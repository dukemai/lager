import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';
import { Account } from '../data';
import { databaseConfig } from './';

export default function configPassport(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = databaseConfig.secret;
  passport.use(new JwtStrategy(opts, (jwtPayLoad, done) => {
    Account.findOne({ userName: jwtPayLoad.userName }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user && user.isActivated) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));
  passport.use(new AnonymousStrategy());
}

const getToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
    return null;
  }
  return null;
};

export { getToken };

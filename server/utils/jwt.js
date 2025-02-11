import 'dotenv/config';
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import jwt from "jsonwebtoken";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    if (jwt_payload) {
        next(null, { 
            id: jwt_payload.id, 
            email: jwt_payload.email, 
            role: jwt_payload.role 
        }); 
    } else {
        next(null, false);
    }
});

passport.use(strategy);

export const initialize = () => passport.initialize();
export const authenticate = () => passport.authenticate('jwt', { session: false });
export const signToken = (payload) => jwt.sign(payload, jwtOptions.secretOrKey);
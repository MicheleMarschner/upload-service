// Imports
const passport = require('passport');
const User = require('../models/User');
// For JWT verification
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
// JWT Strategy
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
			secretOrKey: process.env.JWT_SECRET
		},
		async (payload, done) => {
			const user = await User.findById(payload.id);
			if (!user) return done(null, false);
			done(null, user);
		}
	)
);

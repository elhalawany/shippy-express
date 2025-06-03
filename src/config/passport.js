import passport from "passport";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
// Import necessary strategies
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

export default function (passport) {
  // ======= Local Strategy =======
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });

          if (!user) return done(null, false, { message: "User not found" });

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch)
            return done(null, false, { message: "Invalid credentials" });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // ======= Google Strategy if credentials are provided =======
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const [user] = await User.findOrCreate({
              where: { googleId: profile.id },
              defaults: {
                name: profile.displayName,
                email: profile.emails?.[0]?.value,
                avatar: profile.photos?.[0]?.value,
              },
            });
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      )
    );
  } else {
    console.warn(
      "\x1b[33m%s\x1b[0m",
      "** Google OAuth credentials are not set. Google login will be disabled.",
      "\n"
    );
  }

  // ======= Facebook Strategy if credentials are provided =======
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: process.env.FACEBOOK_CALLBACK_URL,
          profileFields: ["id", "emails", "name", "displayName", "photos"],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const [user] = await User.findOrCreate({
              where: { facebookId: profile.id },
              defaults: {
                name: profile.displayName,
                email: profile.emails?.[0]?.value,
                avatar: profile.photos?.[0]?.value,
              },
            });
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      )
    );
  } else {
    console.warn(
      "\x1b[33m%s\x1b[0m",
      "** Facebook OAuth credentials are not set. Facebook login will be disabled.",
      "\n"
    );
  }
  // ======= Session Handling =======
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });            │
//                │
//                │
//                └─────────────────┬──→ saved to session
//                                  │    req.session.passport.user = {id: '..'}
//                                  │
//                                  ↓
// passport.deserializeUser(function(id, done) {
//                  ┌───────────────┘
//                  │
//                  ↓
//   User.findById(id, function(err, user) {
//       done(err, user);
//   });            └──────────────→ user object attaches to the request as req.user
// });

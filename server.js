/* DEPENDENCIES */

const express = require('express')
const app = express()
const sqlite = require('sqlite3')
const chalk = require('chalk')
const session = require('client-sessions')
const bodyParser = require('body-parser')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy;
const path = require('path')


/* PASSPORT AND SESSION */

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("You have successfully logged in"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


/* LOCAL AUTH */

passport.use(new LocalStrategy(
    function (username, password, done) {
        let sQuery = "SELECT * FROM users WHERE username = (?)"
        console.log('test')
        try {
            // Find the user by email
            gDb.all(sQuery, username, function (err, ajRows) {
                if (err) {
                    gLog('err', 'ERROR in LocalAuth: ' + err)
                    return done(err)
                }

                if (!ajRows) {
                    return done(null, false);
                }

                // Check if password matches the user
                if (ajRows[0].password != password) {
                    return done(null, false);
                }
                gLog('info', ajRows)
                return done(null, user);
            })
        } catch (ex) {
            gLog('ex', 'EXCEPTION in LocalAuth: ' + ex)
            return done(ex)
        }
    }
));

// app.post('/login',
//     passport.authenticate('local', { failureRedirect: '/error' }),
//     function (req, res) {
//         res.redirect('/success?username=' + req.user.username);
//     }
// );

/* GOOGLE AUTH */

passport.use(new GoogleStrategy({
    clientID: '672211653712-v2d6pkqu24flahtb5069jni98qdss5ts.apps.googleusercontent.com',
    clientSecret: 'nTtQk9X8J5CVLDjwgRLvvV_c',
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        if (profile) {
            user = profile;
            console.log(user)
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        // Successful authentication
        res.json({ status: "ok" });
    });


/*  FACEBOOK AUTH --> NOT WORKING ON LOCALHOST, SO FUCK THIS SHIT */

// const FACEBOOK_APP_ID = '166628367333590';
// const FACEBOOK_APP_SECRET = '77bfabeb790a4e78fcfe157ddbb2c4ee';

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "/auth/facebook/callback"
// },
//     function (accessToken, refreshToken, profile, cb) {
//         return cb(null, profile);
//     }
// ));

// app.get('/auth/facebook',
//     passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/error' }),
//     function (req, res) {
//         res.redirect('/success');
//     });


app.use(bodyParser.json());

// Use client-session middleware for persistent login
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}))

// GLOBALS
global.gDb = new sqlite.Database(__dirname + '/db.db')
global.gLog = (sStatus, sMessage) => {
    switch (sStatus) {
        case 'ok':
            console.log(chalk.green(sMessage))
            break
        case 'err':
            console.log(chalk.red(sMessage))
            break
        case 'ex':
            console.log(chalk.magenta(sMessage))
            break
        case 'info':
            console.log(sMessage)
            break
    }
}


// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
const apiRoutes = require('./api/routes');
app.use('/api', apiRoutes);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Listen on port 3333
app.listen('3000', err => {
    if (err) {
        gLog('err', 'Failed to connect to server')
        return
    }
    gLog('ok', 'Server running on port 3000')
    return
})

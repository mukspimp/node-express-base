const express = require('express');
const path = require('path');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const session = require('express-session');
const cookieSession = require('cookie-session');
const csrf = require('csurf');
const passport = require('passport');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/db/config/config.json`)[env];
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const apiRoutes = require('./routes/api.js');
const error = require('./helpers/error.js')

var csrfProtection = csrf({ cookie: true });

app.use(helmet());

// serving static files 
app.use(express.static(path.join(__dirname, 'public')));

// we need this because "cookie" is true in csrfProtection 
app.use(cookieParser());

// Body parser to parse request body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('view options', {
    layout: false
});

require('./controller/authentication').init(app)


let sequelize = new Sequelize(config.database, config.username, config.password, config);
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'processenvSESSION_SECRET',
    store: new SequelizeStore({
        db: sequelize
    }),
    proxy: true,
    expiration: 24 * 60 * 60 * 1000,    
}));

// middleware is required to initialize Passport.
app.use(passport.initialize());
// for persistent login sessions
app.use(passport.session());

// API routes  
app.use('/api', apiRoutes);

app.get('/', csrfProtection, (req, res) => res.send("Hello World..!!"));

/**
 * Error Handler.
 */
// app.use(errorHandler());

app.use(error.logError);
app.use(error.clientErrorHandler);
app.use(error.errorHandler);

app.listen('3001', () => console.log("Listening on port 3001"));
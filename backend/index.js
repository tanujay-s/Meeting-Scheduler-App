var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var MongoStore = require('connect-mongo');
var dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var scheduleRouter = require('./routes/schedule');
var adminMeetingRouter = require('./routes/meeting');
var userMeetingRouter = require('./routes/user');

// Import the db connection function
var { connectDB } = require('./utils/db');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// Session middleware setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Connect to the database
connectDB();

// Define routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/schedules', scheduleRouter);
app.use('/meeting',adminMeetingRouter);
app.use('/api/meetings',userMeetingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;



require('dotenv').config();
require('app-module-path').addPath(__dirname);

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const apiRouter = require('./routes/api/v1');
const usersRouter = require('./routes/api/v1/users');

const app = express();

require('./config/passport');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then( () => console.log('MongoDB connected.') )
.catch( err => console.log(err) );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);

if (process.env.NODE_ENV === 'production') {
    app.use(cors({
        origin: "https://sp23-mooreant-436-donationpal.uc.r.appspot.com"
    }));
} else {
    app.use(cors());
}

app.use('/api/v1', apiRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;

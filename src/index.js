const { ServerConfig, Logger } = require('./config');
const { errorHandlerMiddlewares } = require('./middlewares');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const CONSTANTS = require('./config/constant');

const apiRoutes = require('./routes');

const express = require('express');

const app = express();

app.use(cookieParser());
app.use(session({
  secret: CONSTANTS.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: CONSTANTS.COOKIE_EXPIRES_TIME // 1 hour
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

// MUST be last and before listening
app.use(errorHandlerMiddlewares);

app.listen(ServerConfig.PORT, () => {
    console.log(`Listening on port ${ServerConfig.PORT}`)
    Logger.info(`Listening on port ${ServerConfig.PORT}`);
});


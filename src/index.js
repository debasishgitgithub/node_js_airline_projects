const { ServerConfig, Logger } = require('./config');

const apiRoutes = require('./routes');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Listening on port ${ServerConfig.PORT}`)
    Logger.info(`Listening on port ${ServerConfig.PORT}`);
});
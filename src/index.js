const { PORT } = require('./config');

const apiRoutes = require('./routes');

const express = require('express');

const app = express();

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
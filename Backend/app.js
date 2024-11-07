const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');
const statsRoutes = require('./routes/statsRoutes'); // Import stats routes

const app = express();

app.use(express.json());
app.use('/api', transactionRoutes);
app.use('/api', statsRoutes); // Add stats routes to the API

module.exports = app;

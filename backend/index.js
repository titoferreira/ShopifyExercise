const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes');

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

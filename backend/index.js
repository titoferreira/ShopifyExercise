const express = require('express');
const app = express();
const port = 3000;
const emailRoutes = require('./routes/emailRoutes');
const templateRoutes = require('./routes/templateRoutes');
const webhooksRoutes = require('./routes/webhooksRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/email', emailRoutes);
app.use('/api/template', templateRoutes);
app.use('/api/webhooks', webhooksRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

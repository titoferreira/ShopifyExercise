const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const emailRoutes = require('./routes/emailRoutes');
const templateRoutes = require('./routes/templateRoutes');
const webhooksRoutes = require('./routes/webhooksRoutes');

// Enable CORS for frontend (3001)
app.use(cors({ origin: 'http://localhost:3001' }));

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

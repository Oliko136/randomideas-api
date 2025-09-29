const path = require('path');
const express = require('express');
require('dotenv').config();

const ideasRouter = require('./routes/ideas');

const PORT = process.env.PORT || 8080;
const connectDB = require('./config/db');

connectDB();

const app = express();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
    res.json({ message: 'Welcome to the RandomIdeas API' });
});

app.use('/api/ideas', ideasRouter);

// Explicitly bind to all interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
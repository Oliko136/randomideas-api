const express = require('express');
const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// Explicitly bind to all interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
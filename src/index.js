const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// default route
app.get('/', (req, res) => {
  res.json({ message: 'Swiggy Clone - Hello!' });
});

// health check (for Kubernetes probes)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// sample restaurants API
app.get('/restaurants', (req, res) => {
  res.json([
    { id: 1, name: 'Pizza Place', cuisine: 'Italian' },
    { id: 2, name: 'Samosa Corner', cuisine: 'Indian' }
  ]);
});

app.listen(port, () => {
  console.log(`Swiggy Clone listening on port ${port}`);
});

module.exports = app; // exported for Jest tests

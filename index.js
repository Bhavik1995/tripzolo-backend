const express = require('express');
const app = express();
const port = 3000;

// Sample data
let destinations = [
  { id: 1, name: 'Mumbai', country: 'India' },
  { id: 2, name: 'Paris', country: 'France' }
];

// Routes
app.get('/api/destinations', (req, res) => {
  res.json(destinations);
});

app.get('/api/destinations/:id', (req, res) => {
  const destination = destinations.find(d => d.id === parseInt(req.params.id));
  if (!destination) {
    return res.status(404).send('Destination not found');
  }
  res.json(destination);
});

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});

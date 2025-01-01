const express = require('express');
const cors = require('cors');
const destinations = require('./destinations.json'); // Import the JSON data

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// // Get all packages
// app.get('/api/packages', (req, res) => {
//   res.json(destinations);
// });

app.get('/api/cities', (req, res) => {
  const cities = destinations.map(pkg => pkg.city);
  const uniqueCities = [...new Set(cities)];
  res.json(uniqueCities);
});

// Get packages by city
app.get('/api/packages', (req, res) => {
  const city = req.query.city;
  if (city) {
    const filteredPackages = destinations.filter(pkg =>
      pkg.city.toLowerCase() === city.toLowerCase()
    );
    return res.json(filteredPackages); 
  }
  res.json(destinations); 
});


// Get a single package by ID
app.get('/api/packages/:id', (req, res) => {
  const packageId = req.params.id;
  const selectedPackage = destinations.find(pkg => pkg.id === packageId);

  if (!selectedPackage) {
    return res.status(404).json({ message: 'Package not found' });
  }

  res.json(selectedPackage);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

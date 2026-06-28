const express = require('express');
const app = express();

const port = process.env.PORT || 5000;



// Load seed data (Mocking the seed.json mentioned in the slide)
// In a real scenario, ensure seed.json exists in the same directory or update the path.
let seedData = {
    provinces: [],
    districts: [],
    stations: [],
    vehicles: [],
    pings: [] 
};

try {
    const rawData = fs.readFileSync('seed.json');
    seedData = JSON.parse(rawData);
} catch (error) {
    console.warn("Could not load seed.json. Running with empty arrays.");
}


app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    session : 'NB6007CEMS2'
  });
});


// ---------------------------------------------------------
// 1. Provinces
// ---------------------------------------------------------

// GET /provinces (Collection)
app.get('/provinces', (req, res) => {
    res.status(200).json(seedData.provinces);
});

// GET /provinces/:province-id (Atomic member)
app.get('/provinces/:provinceId', (req, res) => {
    const id = req.params.provinceId;
    const province = seedData.provinces.find(p => p.id == id);
    
    if (province) {
        res.status(200).json(province);
    } else {
        res.status(404).json({ error: "Province not found" });
    }
});

// ---------------------------------------------------------
// 2. Districts
// ---------------------------------------------------------

// GET /districts (Collection)
app.get('/districts', (req, res) => {
    res.status(200).json(seedData.districts);
});

// GET /districts/:district-id (Atomic member)
app.get('/districts/:districtId', (req, res) => {
    const id = req.params.districtId;
    const district = seedData.districts.find(d => d.id == id);
    
    if (district) {
        res.status(200).json(district);
    } else {
        res.status(404).json({ error: "District not found" });
    }
});

// ---------------------------------------------------------
// 3. Stations
// ---------------------------------------------------------

// GET /stations (Collection)
app.get('/stations', (req, res) => {
    res.status(200).json(seedData.stations);
});

// GET /stations/:station-id (Atomic member)
app.get('/stations/:stationId', (req, res) => {
    const id = req.params.stationId;
    const station = seedData.stations.find(s => s.id == id);
    
    if (station) {
        res.status(200).json(station);
    } else {
        res.status(404).json({ error: "Station not found" });
    }
});

// ---------------------------------------------------------
// 4. Vehicles
// ---------------------------------------------------------

// GET /vehicles (Collection)
app.get('/vehicles', (req, res) => {
    res.status(200).json(seedData.vehicles);
});

// GET /vehicles/:vehicle-id (Atomic member)
app.get('/vehicles/:vehicleId', (req, res) => {
    const id = req.params.vehicleId;
    const vehicle = seedData.vehicles.find(v => v.id == id);
    
    if (vehicle) {
        res.status(200).json(vehicle);
    } else {
        res.status(404).json({ error: "Vehicle not found" });
    }
});

// GET /vehicles/:vehicle-id/pings (Scoped collection)
app.get('/vehicles/:vehicleId/pings', (req, res) => {
    const id = req.params.vehicleId;
    
    // First, verify the vehicle exists (to return 404 if it doesn't)
    const vehicle = seedData.vehicles.find(v => v.id == id);
    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }

    // Filter pings that belong strictly to this vehicle
    const vehiclePings = seedData.pings.filter(ping => ping.vehicleId == id);
    res.status(200).json(vehiclePings);
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
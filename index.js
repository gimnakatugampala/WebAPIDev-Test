const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const districtRoutes = require('./routes/districts')
const provincesRoutes = require('./routes/provinces')
const stationsRoutes = require('./routes/stations')
const vehiclesRoutes = require('./routes/vehicles')
const { swaggerSpec, swaggerUi } = require('./swagger')


const port = process.env.PORT || 5000;






app.use(cors());
app.use(express.json());

// 4. Mount the Swagger UI dashboard
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.get('/v1/api', (req, res) => {
  res.json({
    name: 'SL Police Tuktuk Monitoring API',
    endpoints: {
      provinces: {
        'GET /api/v1/provinces': 'List all provinces',
        'GET /api/v1/provinces/:id': 'Get a single province',
        'GET /api/v1/provinces/:id/districts': 'List districts in a province',
      },
      districts: {
        'GET /api/v1/districts': 'List all districts (optional ?province_id=)',
        'GET /api/v1/districts/:id': 'Get a single district',
        'GET /api/v1/districts/:id/stations': 'List stations in a district',
      },
      stations: {
        'GET /api/v1/stations': 'List all stations (optional ?district_id=)',
        'GET /api/v1/stations/:id': 'Get a single station',
        'GET /api/v1/stations/:id/vehicles': 'List vehicles assigned to a station',
      },
      vehicles: {
        'GET /api/v1/vehicles': 'List all vehicles, paginated (optional ?station_id=&page=&limit=)',
        'GET /api/v1/vehicles/:id': 'Get a single vehicle',
        'GET /api/v1/vehicles/:id/pings': 'List ping history for a vehicle, paginated (optional ?from=&to=&page=&limit=)',
        'GET /api/v1/vehicles/:id/pings/latest': 'Get the most recent ping (current location) for a vehicle',
      },
      pings: {
        'GET /api/v1/pings': 'List all pings, paginated (optional ?vehicle_id=&from=&to=&page=&limit=)',
        'GET /api/v1/pings/:id': 'Get a single ping',
      },
      health: {
        'GET /api/v1/health': 'Service health check',
      },
    },
  });
});


// ============= ROUTES ============
app.use('/v1/api/provinces/',provincesRoutes)
app.use('/v1/api/districts/',districtRoutes)
app.use('/v1/api/stations/',stationsRoutes)
app.use('/v1/api/vehicles/',vehiclesRoutes)
// ============= ROUTES ============

// -- CHECK SERVER HEALTH
app.get('/v1/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const districtRoutes = require('./routes/districts')
const provincesRoutes = require('./routes/provinces')
const stationsRoutes = require('./routes/stations')
const vehiclesRoutes = require('./routes/vehicles')

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 5000;


// 1. Define the Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Standard OpenAPI version
    info: {
      title: 'Web API Dev Test',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local server',
      },
      // You can add your Azure URL here later!
      { url: 'https://webapi-sandbox-fecvb2esf4cehuhr.southeastasia-01.azurewebsites.net/', description: 'Production server' }
    ],
  },
  // 2. Tell Swagger where to find your API designs (in this case, this same file)
  apis: ['./index.js'], 
};

// 3. Initialize the Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// 4. Mount the Swagger UI dashboard
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.get('/v1/api', (req, res) => {
  res.json({
    name: 'SL Police Tuktuk Monitoring API',
    endpoints: {
      provinces: {
        'GET /api/provinces': 'List all provinces',
        'GET /api/provinces/:id': 'Get a single province',
        'GET /api/provinces/:id/districts': 'List districts in a province',
      },
      districts: {
        'GET /api/districts': 'List all districts (optional ?province_id=)',
        'GET /api/districts/:id': 'Get a single district',
        'GET /api/districts/:id/stations': 'List stations in a district',
      },
      stations: {
        'GET /api/stations': 'List all stations (optional ?district_id=)',
        'GET /api/stations/:id': 'Get a single station',
        'GET /api/stations/:id/vehicles': 'List vehicles assigned to a station',
      },
      vehicles: {
        'GET /api/vehicles': 'List all vehicles, paginated (optional ?station_id=&page=&limit=)',
        'GET /api/vehicles/:id': 'Get a single vehicle',
        'GET /api/vehicles/:id/pings': 'List ping history for a vehicle, paginated (optional ?from=&to=&page=&limit=)',
        'GET /api/vehicles/:id/pings/latest': 'Get the most recent ping (current location) for a vehicle',
      },
      pings: {
        'GET /api/pings': 'List all pings, paginated (optional ?vehicle_id=&from=&to=&page=&limit=)',
        'GET /api/pings/:id': 'Get a single ping',
      },
      health: {
        'GET /api/health': 'Service health check',
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
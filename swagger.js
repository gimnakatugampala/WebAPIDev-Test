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
  apis: ['./swagger.js'], 
};

// 3. Initialize the Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);




// ================================================================
// SWAGGER JSDOC BLOCKS — paste these into index.js
// (anywhere above or below your routes, before app.listen)
// ================================================================

// ---------------------------------------------------------------
// REUSABLE SCHEMAS (referenced by $ref throughout)
// ---------------------------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Province:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Western Province
 *     District:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Colombo
 *         province_id:
 *           type: integer
 *           example: 1
 *     Station:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Colombo Central Police Station
 *         district_id:
 *           type: integer
 *           example: 1
 *     Vehicle:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         plate:
 *           type: string
 *           example: WP CAB 1234
 *         station_id:
 *           type: integer
 *           example: 1
 *     Ping:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         vehicle_id:
 *           type: integer
 *           example: 1
 *         latitude:
 *           type: number
 *           format: float
 *           example: 6.9271
 *         longitude:
 *           type: number
 *           format: float
 *           example: 79.8612
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: 2024-01-15T08:30:00.000Z
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 100
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 20
 *         totalPages:
 *           type: integer
 *           example: 5
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Resource not found
 */

// ---------------------------------------------------------------
// PROVINCES
// ---------------------------------------------------------------

/**
 * @swagger
 * /v1/api/provinces:
 *   get:
 *     summary: List all provinces
 *     tags: [Provinces]
 *     responses:
 *       200:
 *         description: Array of all provinces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Province'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/provinces/{id}:
 *   get:
 *     summary: Get a single province
 *     tags: [Provinces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Province ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Province object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Province'
 *       404:
 *         description: Province not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/provinces/{id}/districts:
 *   get:
 *     summary: List districts in a province
 *     tags: [Provinces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Province ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Array of districts in the province
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/District'
 *       404:
 *         description: Province not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// ---------------------------------------------------------------
// DISTRICTS
// ---------------------------------------------------------------

/**
 * @swagger
 * /v1/api/districts:
 *   get:
 *     summary: List all districts
 *     tags: [Districts]
 *     parameters:
 *       - in: query
 *         name: province_id
 *         schema:
 *           type: integer
 *         description: Filter districts by province
 *         example: 1
 *     responses:
 *       200:
 *         description: Array of districts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/District'
 */

/**
 * @swagger
 * /v1/api/districts/{id}:
 *   get:
 *     summary: Get a single district
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: District ID
 *         example: 1
 *     responses:
 *       200:
 *         description: District object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/District'
 *       404:
 *         description: District not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/districts/{id}/stations:
 *   get:
 *     summary: List stations in a district
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: District ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Array of stations in the district
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'
 *       404:
 *         description: District not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// ---------------------------------------------------------------
// STATIONS
// ---------------------------------------------------------------

/**
 * @swagger
 * /v1/api/stations:
 *   get:
 *     summary: List all stations
 *     tags: [Stations]
 *     parameters:
 *       - in: query
 *         name: district_id
 *         schema:
 *           type: integer
 *         description: Filter stations by district
 *         example: 1
 *     responses:
 *       200:
 *         description: Array of stations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'
 */

/**
 * @swagger
 * /v1/api/stations/{id}:
 *   get:
 *     summary: Get a single station
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Station ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Station object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/stations/{id}/vehicles:
 *   get:
 *     summary: List vehicles assigned to a station
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Station ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Array of vehicles at the station
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Station not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// ---------------------------------------------------------------
// VEHICLES
// ---------------------------------------------------------------

/**
 * @swagger
 * /v1/api/vehicles:
 *   get:
 *     summary: List all vehicles (paginated)
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: station_id
 *         schema:
 *           type: integer
 *         description: Filter by station
 *         example: 1
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Results per page
 *     responses:
 *       200:
 *         description: Paginated list of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Vehicle'
 *                 meta:
 *                   $ref: '#/components/schemas/PaginationMeta'
 */

/**
 * @swagger
 * /v1/api/vehicles/{id}:
 *   get:
 *     summary: Get a single vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Vehicle object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/vehicles/{id}/pings:
 *   get:
 *     summary: List ping history for a vehicle (paginated)
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle ID
 *         example: 1
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start datetime (ISO 8601)
 *         example: 2024-01-01T00:00:00Z
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End datetime (ISO 8601)
 *         example: 2024-01-31T23:59:59Z
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Results per page
 *     responses:
 *       200:
 *         description: Paginated ping history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ping'
 *                 meta:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/vehicles/{id}/pings/latest:
 *   get:
 *     summary: Get the most recent ping (current location) for a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Latest ping object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ping'
 *       404:
 *         description: Vehicle not found or no pings recorded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// ---------------------------------------------------------------
// PINGS
// ---------------------------------------------------------------

/**
 * @swagger
 * /v1/api/pings:
 *   get:
 *     summary: List all pings (paginated)
 *     tags: [Pings]
 *     parameters:
 *       - in: query
 *         name: vehicle_id
 *         schema:
 *           type: integer
 *         description: Filter by vehicle
 *         example: 1
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start datetime (ISO 8601)
 *         example: 2024-01-01T00:00:00Z
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End datetime (ISO 8601)
 *         example: 2024-01-31T23:59:59Z
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Results per page
 *     responses:
 *       200:
 *         description: Paginated list of pings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ping'
 *                 meta:
 *                   $ref: '#/components/schemas/PaginationMeta'
 */

/**
 * @swagger
 * /v1/api/pings/{id}:
 *   get:
 *     summary: Get a single ping
 *     tags: [Pings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ping ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Ping object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ping'
 *       404:
 *         description: Ping not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// ---------------------------------------------------------------
// HEALTH
// ---------------------------------------------------------------

/**
 * @swagger
 * /v1/api/health:
 *   get:
 *     summary: Service health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-01-15T08:30:00.000Z
 */


module.exports = {
    swaggerSpec,
    swaggerUi
}
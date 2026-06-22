const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '.', 'seed.json');

const raw = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));


const provinces = raw.provinces;
const districts = raw.districts;
const stations = raw.stations;
const vehicles = raw.vehicles;
const pings = raw.pings;

const byId = (arr) => {
  const map = new Map();
  for (const item of arr) map.set(item.id, item);
  return map;
};


const provincesById = byId(provinces);
const districtsById = byId(districts);
const stationsById = byId(stations);
const vehiclesById = byId(vehicles);
const pingsById = byId(pings);

module.exports = {
    provinces,
    districts,
    stations,
    vehicles,
    pings,
    provincesById,
    districtsById,
    stationsById,
    vehiclesById,
    pingsById
}
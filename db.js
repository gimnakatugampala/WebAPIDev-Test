
const express = require('express');

const fs = require('fs');
const path = require('path');

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
    const DATA_PATH = path.join(__dirname, '.', 'seed.json');

    seedData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

} catch (error) {
    console.warn("Could not load seed.json. Running with empty arrays.");
}

module.exports = {seedData}
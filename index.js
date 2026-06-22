const express = require('express');
require('dotenv').config()
const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// -- CHECK SERVER HEALTH
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
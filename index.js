const express = require('express');
const app = express();

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    session : 'NB6007CEMS2'
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
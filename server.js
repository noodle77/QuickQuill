const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const htmlRoutes = require('./routes/html.js');
const apiRoutes = require('./routes/api.js');

// Middleware:
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());

// Imported Routes:
app.use('/', apiRoutes);
app.use('/', htmlRoutes);

// Start Server:
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
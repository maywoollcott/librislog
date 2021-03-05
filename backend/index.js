const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB();



app.use(cors());
app.use(express.json( {extended: false }));

app.get('/', (req, res) => {
  res.send('API running successfully.');
});

//Define Routes
app.use('/', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});
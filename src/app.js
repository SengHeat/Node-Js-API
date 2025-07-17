const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/error.middleware');

require('dotenv').config();
require('./models');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;

const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

connectDB();
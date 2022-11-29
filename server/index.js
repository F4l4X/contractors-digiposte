import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import contractorRoutes from './routes/contractors.js'

const app = express();

dotenv.config();

app.use(bodyParser.json({limite: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/contractors', contractorRoutes);

const PORT = process.env.PORT || 5003;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error))
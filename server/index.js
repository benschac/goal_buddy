import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from 'dotenv';
import router from './router';

config();

const dbURI = 'mongodb://localhost/auth';
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

mongoose.connect(dbURI)
.catch(err => console.error(`Error from mongoose ${err}`));

// Middleware chain

// update this to just the front-end at some point
app.use(cors());
app.use(logger('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);
server.listen(port);

console.info(`Server listening on port ${port}`);
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import {config} from 'dotenv';
import router from './router';

config();

console.log(process.env.JWT_SECRET);
mongoose.connect('mongodb://localhost/auth')
.catch(err => console.error(`Error from mongoose ${err}`));

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(logger('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);



server.listen(port);
console.info(`Server listening on port ${port}`);
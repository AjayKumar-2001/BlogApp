import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary'
dotenv.config();

const app = express();
app.use(fileUpload({
    useTempFiles: true
}))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json())
// app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors({
    origin:["http://localhost:5173"],
}));
app.use('/', Router);

app.use('*', (req, res) => {
    res.status(500).json({msg: 'Route not found'})
})

const PORT = 8000;

app.listen(PORT, () => 
    console.log(`Server is running successfully on PORT ${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);
import express from "express";
import pkg from "pg";
const {Pool}=pkg;
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from 'path';
import bodyParser from "body-parser";
import pool from "./db.js";
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import authRoutes from "./routes/auth.js";
import farmRoutes from "./routes/farm.js";
import { register } from "./controllers/auth.js";
import {login} from "./controllers/auth.js";
import {addfarm} from "./controllers/farm.js";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
dotenv.config();
app.use(cors());

app.use(morgan("commons"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// Configure the PostgreSQL connection
// const pool = new Pool({
//   user: 'postgres',
//   host: 'farmsdata.ct8uokqqybtk.eu-north-1.rds.amazonaws.com',
//   database: 'farmdataDB',
//   password: 'rootmaurya1234',
//   port: 5432, // Replace with your port if different
//   ssl: {
//     rejectUnauthorized: false // Use this option if using SSL and get "self signed certificate" error
//   }
// });

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database', err.stack);
  } else {
    console.log('Connected to PostgreSQL database:', res.rows[0].now);
  }
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//app.get('/auth/register');
app.post('/auth/register',register);
app.use("/auth",authRoutes);
app.use("/farms",farmRoutes);


// //image upload AWS
// AWS.config.update({
//   accessKeyId: 'AKIAXYKJTKHBMA3BXMX5',
//   secretAccessKey: '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',
  
// });


// const storage=multer.memoryStorage();
// const upload=multer({
//   storage:storage
// });


app.get('/users', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM USERS');
      const results = { 'results': (result) ? result.rows : null };
      res.json(results);
      client.release();
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.post('/users', async (req, res) => {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
      }
    const { id, name, email, password } = req.body;
  
    try {
      const client = await pool.connect();
      const query = 'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3,$4) RETURNING *';
      const values = [id, name, email, password];
      const result = await client.query(query, values);
      res.status(201).json(result.rows[0]);
      client.release();
    } catch (err) {
      console.error('Error inserting user:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

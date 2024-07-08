import pkg from "pg";
const {Pool}=pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'farmsdata.ct8uokqqybtk.eu-north-1.rds.amazonaws.com',
    database: 'farmdataDB',
    password: 'rootmaurya1234',
    port: 5432, // Replace with your port if different
    ssl: {
      rejectUnauthorized: false // Use this option if using SSL and get "self signed certificate" error
    }
  });
  export default pool;
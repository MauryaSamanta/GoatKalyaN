import pool from "../db.js";
import axios from "axios";
//import S3 from '@aws-sdk/clients/s3.js';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';


const s3=new S3Client({});

/*ADDING A FARM FROM USER*/ 
export const addfarm = async (req, res) => {
  //console.log(req.file);
  //console.log(req.files);
  
    try {
      const {
        userid,
        name_farm,
        name_farmer,
        location_map_farm,
        farm_male,
        castrated,
        farm_female,
        farm_young,
        latLng
      } = req.body;

      //Animal Housing

      const {
        floor,
        roof,
        bedding,
        thermal,
        watering,

      }=req.body;
      var total=parseInt(floor)+parseInt(roof)+parseInt(bedding)+parseInt(thermal)+parseInt(watering);
      
     console.log(latLng);
      const client = await pool.connect();
        const query = 'INSERT INTO farms (name_farm, name_farmer, location_farm, farm_male, farm_female, farm_young, user_id, created_at, location_map_farm, castrated) VALUES ($1, $2, $3,$4,$5,$6,$7,NOW(),$8, $9) RETURNING *';
        const values = [
            name_farm,
            name_farmer,
            latLng,
            farm_male,
            farm_female,
            farm_young,
            userid,
            location_map_farm,
            castrated];
        const result = await client.query(query, values);
        const farm_id=result.rows[0].farm_id;
        const query1='INSERT INTO housing (farm_id, floor, roof, bedding, thermal, watering,total,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
        const values1=[farm_id,
          floor,
          roof,
          bedding,
          thermal, 
          watering,
          total,
          userid
        ];
        const result1=await client.query(query1,values1);
        const {relations,
          oblivion,
          aggres,
          alert, 
          lively,
          suffer}=req.body;
          total=parseInt(relations)+parseInt(oblivion)+parseInt(aggres)+parseInt(alert)+parseInt(lively)+parseInt(suffer);
        const query2='INSERT INTO behaviour (farm_id, relations, oblivion, aggres, alert, lively, suffer, total,user_id) VALUES ($1,$2,$3,$4,$5,$6, $7, $8, $9) RETURNING *';
        const values2=[farm_id,
          relations,
          oblivion,
          aggres,
          alert, 
          lively,
          suffer,
          total,
          userid
        ];
        //console.log(values2);
        const result2=await client.query(query2,values2);
        const{grazing,
          supple,
          forage,
          water }=req.body;
          total=parseInt(grazing)+parseInt(supple)+parseInt(forage)+parseInt(water);
        const query3='INSERT INTO fodder (farm_id, grazing, supple, forage, water, total,user_id) VALUES ($1,$2,$3,$4,$5, $6,$7) RETURNING *';
        
        const values3=[farm_id,
          grazing,
          supple,
          forage,
          water, 
          total,
          userid
          
        ];
        const result3=await client.query(query3,values3);
        const { condition, 
          hock, 
          lame, 
          adscesses, 
          hair, 
          faecal, 
          nasal, 
          ocular, 
          overgrown, 
          vaccine, 
          deworm}=req.body;
          total=parseInt(condition)+parseInt(hock)+parseInt(lame)+parseInt(adscesses)+parseInt(hair)+parseInt(faecal)
          +parseInt(nasal)+parseInt(ocular)+parseInt(overgrown)+parseInt(vaccine)+parseInt(deworm);
        const query4='INSERT INTO health (farm_id, condition, hock, lame, adscesses, hair, faecal, nasal, ocular, overgrown, vaccine, deworm, total,user_id) VALUES ($1,$2,$3,$4,$5,$6, $7, $8, $9, $10, $11, $12, $13,$14) RETURNING *';
        
        const values4=[farm_id, 
          condition, 
          hock, 
          lame, 
          adscesses, 
          hair, 
          faecal, 
          nasal, 
          ocular, 
          overgrown, 
          vaccine, 
          deworm,
          total,
          userid
        ];
        const result4=await client.query(query4,values4);
        // const params={
        //   Bucket:'goatkalyan',
        //   Key: req.file.originalname,
        //   Body:req.file.buffer,
        //   ContentType:req.file.mimetype,
        //   ACL:'public-read'
        //  }
        //   const command=new PutObjectCommand(params);
        //   await s3.send(command);
        //   const s3Url = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        //   const query5 = `
        //   INSERT INTO images (farm_id, image_url, user_id)
        //   VALUES ($1, $2, $3)
        //   RETURNING *;
        // `;
        // const values5 = [farm_id, s3Url, userid];
        // const result5 = await pool.query(query5, values5);

      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const getUserFarms=async(req,res)=>{
    const userid=parseInt(req.params.userid,10);
    try {
      const query = 'SELECT * FROM farms WHERE user_id = $1';
      const { rows } = await pool.query(query, [userid]);

      res.json(rows);
    } catch (err) {
      console.error('Error retrieving farms:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const getUserFarms50=async(req,res)=>{
    const userid=req.params.userid;
    //console.log(userid);
    try {
      const client = await pool.connect();
      
      // Construct the SQL query with userId from req.params
      const query = `
        SELECT
          (SELECT COUNT(*) FROM housing WHERE user_id = ${userid} AND total > 12) AS housing_count,
          (SELECT COUNT(*) FROM fodder WHERE user_id = ${userid} AND total > 9) AS fodder_count,
          (SELECT COUNT(*) FROM health WHERE user_id = ${userid} AND total > 7) AS health_count,
          (SELECT COUNT(*) FROM behaviour WHERE user_id = ${userid} AND total > 19) AS behaviour_count;
      `;
  
      // Execute the query
      const { rows } = await client.query(query);
  
      // Release the client back to the pool
      client.release();
  
      // Extract counts from the result rows
      const counts = {
        housingCount: parseInt(rows[0].housing_count),
        fodderCount: parseInt(rows[0].fodder_count),
        healthCount: parseInt(rows[0].health_count),
        behaviourCount: parseInt(rows[0].behaviour_count),
      };
  
      res.json(counts);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      console.error('Error executing query:', err);
      throw err;
    }
  }

  export const getFarmDetails=async(req,res)=>{
    const farmid=req.params.farmid;
    const client = await pool.connect();
      
    try {
    //   const query = `
    //   SELECT 
    //     farms.*, 
    //     housing.*, 
    //     behaviour.*, 
    //     health.*, 
    //     fodder.*, 
    //     images.image_url AS image_url
    //   FROM farms 
    //   LEFT JOIN housing ON farms.farm_id = housing.farm_id
    //   LEFT JOIN behaviour ON farms.farm_id = behaviour.farm_id
    //   LEFT JOIN health ON farms.farm_id = health.farm_id
    //   LEFT JOIN fodder ON farms.farm_id = fodder.farm_id
    //   LEFT JOIN images ON farms.farm_id = images.farm_id
    //   WHERE farms.farm_id = $1
    // `;
    const query=`SELECT 
    farms.*, 
    housing.*, 
    housing.total AS housing_total, 
    behaviour.*, 
    behaviour.total AS behaviour_total, 
    health.*, 
    health.total AS health_total, 
    fodder.*, 
    fodder.total AS fodder_total, 
    images.image_url AS image_url
FROM farms 
LEFT JOIN housing ON farms.farm_id = housing.farm_id
LEFT JOIN behaviour ON farms.farm_id = behaviour.farm_id
LEFT JOIN health ON farms.farm_id = health.farm_id
LEFT JOIN fodder ON farms.farm_id = fodder.farm_id
LEFT JOIN images ON farms.farm_id = images.farm_id
WHERE farms.farm_id = $1;`;
    const values = [farmid];
    const result = await client.query(query, values);
    res.json(result.rows[0]);
    } catch (error) {
      res.json(error);
    }
  }

  export const deleteFarm=async(req,res)=>{
    const farmid=req.params.farmid;
    const client=await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Delete related records from housing, behaviour, health, fodder, and images tables
      await client.query('DELETE FROM housing WHERE farm_id = $1', [farmid]);
      await client.query('DELETE FROM behaviour WHERE farm_id = $1', [farmid]);
      await client.query('DELETE FROM health WHERE farm_id = $1', [farmid]);
      await client.query('DELETE FROM fodder WHERE farm_id = $1', [farmid]);
      //await client.query('DELETE FROM images WHERE farm_id = $1', [farmid]);
      
      // Delete the farm record
      await client.query('DELETE FROM farms WHERE farm_id = $1', [farmid]);
      
      await client.query('COMMIT');
      console.log(`Farm with ID ${farmid} and all related records have been deleted.`);
      res.json("OK");
    } catch (error) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: 'Internal Server Error' });
      console.error('Error deleting farm:', error);
    } 
  }
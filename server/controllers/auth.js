import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";
//import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      
    } = req.body;
    console.log(req.body);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(username);
    const client = await pool.connect();
      const query = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *';
      const values = [ username, email, passwordHash];
      const result = await client.query(query, values);
    //const savedUser = await newUser.save();
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //const user = await User.findOne({ email: email });
    const client = await pool.connect();
    const query = 'SELECT * FROM users WHERE user_email = $1';
    const values = [email];
    const result = await client.query(query, values);
    console.log("hjere");
    
    if (result.rows.length > 0) {
        // Email found, return the password (In a real app, you should handle this more securely)
        const pass=result.rows[0].user_password;
        const isMatch = await bcrypt.compare(password,pass);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        const token = jwt.sign({ id: result.rows[0].user_id }, "siohsuhyweiuhrwejfbiweufhuiuewfg");
       
        //console.log(token);
        const user = result.rows[0];
        console.log(user.user_id);
        res.status(200).json({ token,  
          user: {
          userid: user.user_id,
          username: user.user_name,
          email: user.user_email,
          password: user.user_password,
        }, });
      } else {
        // Email not found
        res.status(404).json({ message: 'Email not found' });
      }
    // if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    
    //delete user.password;
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
import jwt from'jsonwebtoken'
import { pool } from "../config/db.js"

export const protect = async (req, res, next) => {
	try {
		const token = req.cookies.token; //getting token
	
		if(!token) { //Checking if token exists
			return res.status(401).json({message: "no token"})
		} 
		
		//Decoding token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		
		//Checking if user exists in DB
		const user = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [decoded.id]);
		
		//Action if user doesn't exit
		if(user.rows.length === 0){ 
			return res.status(401).json({message: "no user"})
		}
		
		req.user = user.rows[0];
		
		next();
	} catch(err){
		console.error(err)
		res.status(401).json({message: "not authorized, token failed"})
	}
}
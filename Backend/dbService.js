const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); 

let instance = null;
let connection = null;
let reconnectTimer = null;

// in case mysql isn't ready immediately
reconnectTimer = setInterval(connectToMYSQL, 2000);
connectToMYSQL();

function connectToMYSQL(){
   connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,        
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT
   });
   connection.connect((err) => {
      if(err){
         console.log(err.message);
      }
      if (connection.state === "connected"){
         connection.query(`
            CREATE TABLE IF NOT EXISTS users (
               username VARCHAR(50) primary key,
               password VARCHAR(50),
               firstname VARCHAR(50),
               lastname VARCHAR(50),
               salary FLOAT,
               age INTEGER,
               registerday DATE,
               signintime DATETIME
            );
         `);
         clearInterval(reconnectTimer);
      }
      console.log('db ' + connection.state);  
   });

}

// making a query
// const query = "SELECT * FROM users;";
// connection.query(query, (err, results) => {
//       if(err) reject(new Error(err.message));
//       else resolve(results);
// });

// insert query
// const query = "INSERT INTO names (name, date_added) VALUES (?, ?);";
// connection.query(query, [name, dateAdded], (err, result) => {
//       if(err) reject(new Error(err.message));
//       else resolve(result.insertId);
// });

//ANOTHA ONE
// const query = "SELECT * FROM names where name = ?;";
// connection.query(query, [name], (err, results) => {
//       if(err) reject(new Error(err.message));
//       else resolve(results);
// });

// ANOTHA ONE
// const query = "DELETE FROM names WHERE id = ?;";
// connection.query(query, [id], (err, result) => {
//       if(err) reject(new Error(err.message));
//       else resolve(result.affectedRows);
// });

// TELL EM TO BRING OUT THE WHOLE OCEAN
// const query = "UPDATE names SET name = ? WHERE id = ?;";
// connection.query(query, [newName, id], (err, result) => {
//       if(err) reject(new Error(err.message));
//       else resolve(result.affectedRows);
// });

class Users{
   static getUsersInstance(){ 
      instance = instance ? instance : new DbService()
      return instance
   }

}


module.exports = DbService;

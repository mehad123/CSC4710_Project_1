const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); 

let instance = null; 
let connection = null;
let reconnectTimer = null;
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
            CREATE TABLE IF NOT EXISTS names (
               id INT AUTO_INCREMENT PRIMARY KEY,
               name VARCHAR(200),
               date_added DATE
            );
         `);
         clearInterval(reconnectTimer);
      }
      console.log('db ' + connection.state);  
   });

}


class DbService{
   static getDbServiceInstance(){ 
      return instance ? instance : instance = new DbService();
   }

   async getAllData(){
        try{
           const response = await new Promise((resolve, reject) => 
              {
                  const query = "SELECT * FROM names;";
                  connection.query(query, 
                       (err, results) => {
                             if(err) reject(new Error(err.message));
                             else resolve(results);
                       }
                  );
               }
            );
        
            return response;

        }  catch(error){
           console.log(error);
        }
   }

   async insertNewName(name){
         try{
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => 
            {
               const query = "INSERT INTO names (name, date_added) VALUES (?, ?);";
               connection.query(query, [name, dateAdded], (err, result) => {
                   if(err) reject(new Error(err.message));
                   else resolve(result.insertId);
               });
            });
            return{
                 id: insertId,
                 name: name,
                 dateAdded: dateAdded
            };
         } catch(error){
               console.log(error);
         }
   }

   async searchByName(name){
        try{
             const response = await new Promise((resolve, reject) => 
                  {
                     const query = "SELECT * FROM names where name = ?;";
                     connection.query(query, [name], (err, results) => {
                         if(err) reject(new Error(err.message));
                         else resolve(results);
                     });
                  }
             );

             return response;

         }  catch(error){
            console.log(error);
         }
   }

   async deleteRowById(id){
         try{
              id = parseInt(id, 10);
              const response = await new Promise((resolve, reject) => 
                  {
                     const query = "DELETE FROM names WHERE id = ?;";
                     connection.query(query, [id], (err, result) => {
                          if(err) reject(new Error(err.message));
                          else resolve(result.affectedRows);
                     });
                  }
               );
               return response === 1? true: false;

         }  catch(error){
              console.log(error);
         }
   }
  
  async updateNameById(id, newName){
      try{
           id = parseInt(id, 10);
           const response = await new Promise((resolve, reject) => 
               {
                  const query = "UPDATE names SET name = ? WHERE id = ?;";
                  connection.query(query, [newName, id], (err, result) => {
                       if(err) reject(new Error(err.message));
                       else resolve(result.affectedRows);
                  });
               }
            );

            return response === 1;
      }  catch(error){
         console.log(error);
      }
  }
}

module.exports = DbService;

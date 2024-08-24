const mysql=require('mysql2/promise');

const mySqlPool=mysql.createPool({
   host:"localhost",
   user:"root",
   password:"alok8576",
   database:"school_db"
})
module.exports=mySqlPool;
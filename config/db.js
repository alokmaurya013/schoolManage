const mysql=require('mysql2/promise');
const password=process.env.PASSWORD
const mySqlPool=mysql.createPool({
   host:"localhost",
   user:"root",
   password:password,
   database:"school_db"
})
module.exports=mySqlPool;
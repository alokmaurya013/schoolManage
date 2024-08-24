const mysql=require('mysql2/promise');
const host=process.env.HOST;
const user=process.env.USER;
const password=process.env.PASSWORD;
const database=process.env.DATABASE;
const port=process.env.DB_PORT;
const mySqlPool=mysql.createPool({
   host:host,
   user:user,
   password:password,
   database:database,
   port:port
})
module.exports=mySqlPool;
const db=require('../config/db');
const {validationResult}=require('express-validator');

const addSchool=async(req,res)=>{
    try{
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(404).json({error:error.array()})
        }
      const {name,address,latitude,longitude}=req.body;
      const data=await db.query(`INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)`,[name,address,latitude,longitude])
      if(!data){
       return res.status(404).send({
        success:false,
        message:'Error in insert query'
       })
      }
      res.status(200).send({success:true,
        message:'data inserted successfully'
      })
    }catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            message:"Error in add school api",
            e
        })
    }
}
const calculateDistance=(lat1,lon1,lat2,lon2)=>{
   const r=6371;
   const dlt=(lat2-lat1)*(Math.PI/180);
   const dln=(lon2-lon1)*(Math.PI/180);

   const a=Math.sin(dlt/2)*Math.sin(dlt/2)+Math.cos(lat1*(Math.PI/180))*Math.cos(lat2*(Math.PI/180))*Math.sin(dln/2)*Math.sin(dln/2);
   const b=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
   const distance=r*b;
   return distance;
}
const listSchools=async(req,res)=>{
    const {latitude,longitude}=req.body;
    if(!latitude||!longitude){
        return res.status(400).send({
            success:false,
            message:'Latitude and longitude are required'
        });
    }
   try{
      const [data]=await db.query('SELECT * FROM schools')
      if(!data||data.length===0){
        return res.status(404).send({success:false,
            message:'No schools found'
        })
      }
     const schoolsWithDistance=data.map((school)=>{
        const dist=calculateDistance(parseFloat(latitude),parseFloat(longitude),school.latitude,school.longitude);
        return {...school,dist};
     }).sort((a,b)=>a.dist-b.dist)
     res.status(200).send({
        success:true,
        message:'All schools sorted by proximity',
        data:schoolsWithDistance
     })
   }catch(e){
     console.log(e);
    res.status(500).send({
        success:false,
        message:'Error in Get All Student API',
        e
    })
   }
}
module.exports={addSchool,listSchools};

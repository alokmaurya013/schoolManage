const express=require('express');
const { addSchool,listSchools} = require('../controllers/schoolController');
const {body}=require('express-validator')
const router=express.Router();

router.post('/addSchool',[
    body('name').notEmpty().withMessage('School name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('latitude').isFloat().withMessage('Latitude must be a valid float'),
    body('longitude').isFloat().withMessage('Longitude must be a valid float')
], addSchool);
router.get('/listSchools',listSchools);
module.exports=router;
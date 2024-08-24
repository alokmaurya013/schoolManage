const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mySqlPool = require('./config/db');
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/school',require('./routes/schoolRoute'));
app.get('/', (req, res) => {
    res.status(200).json('Hello from server');
})

mySqlPool.query('SELECT 1').then(() => {
    console.log('Mysql db connected')
    app.listen(port, () => {
        console.log('Server is running on port: ', port);
    });
}).catch((e) => {
    console.log(e);
});
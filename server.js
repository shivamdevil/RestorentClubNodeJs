const express = require('express')
const app = express()
const port = 3000
const db = require('./db')
require('dotenv').config();




const bodyParser = require('body-parser')
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Welcome to Our Restorent')
})

//Import Router Files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use The routes
app.use('/', personRoutes);
app.use('/menu', menuItemRoutes);



app.listen(PORT, () => {
    console.log(`Example app listening on port ${port}`)
})
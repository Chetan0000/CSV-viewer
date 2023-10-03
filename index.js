const path = require('path');
const express = require('express');
const { use } = require('./routs');
const multer  = require('multer');
const Db = require('./config/mongoose');
const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: true}));

// set up a static files

app.use(express.static('./assets'));


// set up view engine

app.set('view engine', 'ejs');
app.set('views','./views');
app.use('/',require('./routs'));

app.listen(PORT , (error) => {
    if(error){console.log(`Error in shooting up the server ${error}`);}

    console.log(`Server is up and running`);
})




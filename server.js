const express = require('express');
const bodyParser = require('body-parser');

//set up Express App
const app = express();
const port = process.env.PORT || 3000;

//establish public dir
app.use(express.static('public'));

//establish bodyParser
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

//set up handlebars as view engine
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

//set up routes for the server
// app.use(router);


//getting the models from db as db
// const db = require('./models');

//sync to db, start listening
// db.sync().then( () => {
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
// });

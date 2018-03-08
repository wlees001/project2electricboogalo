const express = require('express');
const bodyParser = require('body-parser');
var methodOverride = require("method-override");
const exphbs = require('express-handlebars');


//set up Express App
const app = express();
const port = process.env.PORT || 3000;

const db = require("./models"); 

//establish public dir
app.use(express.static(__dirname + '/public'));

//establish bodyParser
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set the engine up for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//set up routes for the server
// app.use(router);


//getting the models from db as db
<<<<<<< HEAD
const db = require('./models');

//sync to db, start listening
db.sequelize.sync().then( () => {
=======
require("./api-routes.js")(app);


//sync to db, start listening
db.sequelize.sync().then( () => {
    db.Search.create({
        links: "https://open.spotify.com/user/1258026110/playlist/16NA89u5RnWwip43Ir0EVq"

    })
>>>>>>> e7440d869b4eca134380af3cd54cfb48f0ae4db6
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
});

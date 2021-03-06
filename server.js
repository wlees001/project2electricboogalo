const express = require('express');
const bodyParser = require('body-parser');
var methodOverride = require("method-override");
const exphbs = require('express-handlebars');


//set up Express App
const app = express();
//if it detects prod env, use that first
const port = process.env.PORT || 3000;

//establish public dir
app.use(express.static(__dirname + '/public'));

//establish bodyParser
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set the engine up for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//set up routes for the server
require('./api-routes.js')(app);


//getting the models from db as db
const db = require('./models');

//sync to db, start listening
db.sequelize.sync().then( () => {
    db.Search.create({
        links: "https://open.spotify.com/user/1258026110/playlist/16NA89u5RnWwip43Ir0EVq"
    });
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
});

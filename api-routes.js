const db = require("./models");

const express = require('express');

module.exports = function (app) {

	//homepage
	app.get('/', function(req, res) {
		//serve back the home page
		res.render('index');
	});

	//recipe + playlist page
	app.get('/results', function(req, res) {
		//render something
		// res.render('results');
	});

	//get playlist from the db
	app.get('/playlist/:id', function(req,res){
		const id = req.params.id;
		//get the playlist by id and return it
		db.Playlist.findById(id).then(playlist => res.json(playlist));
	});

	//add new playlists to db
	app.post('/playlist', function(req,res){
		//get the playlist link being sent in and return it
		db.Playlist.create({ link : req.body.link}).then( playlist => res.json(playlist));
	});

	// get playlist from the db
	app.get('/recipe/:id', function(req,res){
		const id = req.params.id;
		//get the recipe by the id and return it
		db.Search.findById(id).then(recipe => res.json(recipe));
	});

	// add new recipe to db
	app.post('/recipe', function(req,res){
		db.Search.create({ links : req.body.link}).then( recipe => {
			//mirror back recipe
			res.json(recipe);
			//redirect to second page using id?
		});
	});

};

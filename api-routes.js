const db = require("./models");
const express = require('express');
//require unirest for spoonacular
const unirest = require('unirest');
//require request for deepAI
const request = require('request');


// const SpotifyWebApi = require('spotify-web-api-node');
// //
// const spotifyApi = new SpotifyWebApi({
//   clientId : '694a94afe28046d2abf32d1fedf37faf',
//   clientSecret : '153738bdc6724ed9b152c55d8ee2f9f9'
// });
//
// spotifyApi.setAccessToken('BQCLeEqr2wrQcrAu6j1oEdr9PEjzJOWbDNpXenDvRNmru3UebIldWhsMy7jiGoHEcRZky6Z8BJeLTF8HwCWQx-UGrQpw24h7q8fJ_ubrEv6T7gGiRV7DqnohbeL6iY0os2MNhfbvCTw');
//
// spotifyApi.getPlaylistsForCategory('dinner', {
// 		country : 'US'
// 	}).then( (data) => {
// 		console.log(data.body);
// 	}, (err) => {
// 		console.log(err);
// 	});

module.exports = function (app) {

	//homepage
	app.get('/', function(req, res) {
		//serve back the home page
		res.render('index');
	});

	//recipe + playlist page
	app.get('/results/:id', function(req, res) {
		//get results from db back based on id
		const id = req.params.id;

		db.Search.findById(id).then(recipe => {
			db.Playlist.find({ where : { SearchId : id }}).then(playlist => {
				res.json( [ recipe, playlist ]);
			});
		});
	});

	//create unirest route so we can use server side API calls
	app.post('/unirest', function(req, res){
		const recipe = req.body.link;
		//make request through unirest to programmatic link
		unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=${recipe}`)
			.header("X-Mashape-Key", "Ic67JZDl6smshPY8Y8oBiV8ffzaHp15tnm1jsnbIYJSXkmuzVJ")
			.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
			.end(function (result) {
			  res.json(result.body);
			});
	});

	//create deepAI route so we can use server side API calls
	app.post('/deepAI', function(req, res){
		//using request as per deepAI docs
		request.post({
			url : 'https://api.deepai.org/api/sentiment-analysis',
			headers : {
				'Api-Key':'98d2a2dd-909a-4d7a-af49-2b076fb58151'
			},
			formData : {
				'text' : req.body.text
			}
		}, function(err, httpResponse, body){
			//log errors if they're thrown
			if (err) { console.log(`request failed: ${err}`); return;}

			const response = JSON.parse(body);
			//change to a JS array
			const arr = response.output;

			//start value in middle of spotify response array
			//basically we know the array is of size 20, and we're getting a randomly chosen index from it
			//this is what simulates the "randomness" from a recipe
			let index = 10;
			let counter = 0;
			arr.forEach(sentiment => {
				//if the sentiment for the step is positive or negative, change the counter value
				//if it's neutral, it will do nothing
				if (sentiment === 'Positive'){
					counter++;
				}
				else if (sentiment === 'Negative'){
					counter--;
				}
			});
			//now that we have the value based on the instructions
			//apply it to the index, while keeping it a value between 0 and 20
			index = (index + counter) % 20;
			//send the calculated index back
			res.json({ retIndex : index });
		});
	});

	//create spotify route so we can use server side API calls
	app.post('/spotify', function(req, res){
		const id = req.body.searchId;
		db.Playlist.create({
			//hard set playlist link for demo purposes
			//oauth is annoying
			link : 'https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX4xuWVBs4FgJ',
			SearchId : id
		}).then(playlist => res.redirect(`/results/${id}`));
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

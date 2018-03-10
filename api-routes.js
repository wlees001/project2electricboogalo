const db = require("./models");

const express = require('express');
// const router = express.Router();

module.exports = function (router) {

	router.get('/', function(req, res) {
		//serve back the main page
		res.render('index');
	});

	//get playlist from the db
	router.get('/songs', function(req,res){
		res.send({type:'GET'});
	});
	//add new songs to db
	router.post('/songs', function(req,res){
		res.send({type:'POST'});
	});

	// get playlist from the db
	router.get('/recipe', function(req,res){
		res.send({type:'GET'});
	});
	// add new recipe to db
	router.post('/recipe', function(req,res){
		res.send({type:'POST'});
	});

};

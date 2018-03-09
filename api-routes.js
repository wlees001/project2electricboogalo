const db = require("./models");

const express = require('express');
// const router = express.Router();

module.exports = function (router) {
	
	router.get('/', function(req, res) {
		db.Search.findAll().then( (data) => {
			res.render('index',{
				eaten : data
			});
		})
	});
	  
    
	//get playlist from the db
	router.get('/songs', function(req,res){
		res.send({type:'GET'});
	});
	//add new songs to db
	router.post('/songs', function(req,res){
		res.send({type:'POST'});
	});
	//update playlist in db
	router.put('/songs', function(req,res){
		res.send({type:'PUT'});
	});

	// get playlist from the db
	router.get('/recipe', function(req,res){
		res.send({type:'GET'});
	});
	// add new recipe to db
	router.post('/recipe', function(req,res){
		res.send({type:'POST'});
	});
	// update recipe in db
	router.put('/recipe', function(req,res){
		res.send({type:'PUT'});
	});

};

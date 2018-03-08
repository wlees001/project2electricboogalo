const router = express.Router();
const express = require('express');

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

//delete song from db??
// router.delete('/songs', function(req,res){
	// res.send({type:'DELETE'});
// });

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
// delete recipe in db??
// router.delete('/recipe', function(req,res){
// 	res.send({type:'DELETE'});
// });

module.exports = router;
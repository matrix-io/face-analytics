"use strict";

// Get your Key from the Mashape API, refer to README.md
var face = require('./index.js').key(process.env.API_KEY);

// Pass an image, receive a response object
var img = "https://storage.googleapis.com/detection-server-tests/characters.jpg";
face.detect(img)
	.then(function(response) {
		//throw responses
		console.log(response);
	},function(error){
		//throw errors
		console.log(error);
	});
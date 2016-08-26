"use strict";

var unirest = require('unirest')
    ,$q     = require('q')
    ,_      = require('lodash')
    ,api    = {
  url: function() {
    return "https://matrixone-detect-v1.p.mashape.com/api/v1/faces";
  },
  key: function(key) {
    api.apiKey = !_.isEmpty(key) ? key : '';
    return api;
  },
  detect: function(obj) {
    var img = obj; // "https://storage.googleapis.com/detection-server-tests/faces.jpg"
    var defer = $q.defer();

    if(_.isUndefined(api.apiKey)) { 
      defer.reject({ 'message': 'Missing API Key!' });
    }

    if(_.isUndefined(obj) || _.isEmpty(obj)) { 
      defer.reject({ 'message': 'Missing an Image!' });
    }

    unirest.post(api.url())
    .header("X-Mashape-Key", api.apiKey)
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    .send( { "imageUrl": obj } )
    .end(function (response) {
      if(response.status === 200) {
        defer.resolve({
          "detections":response.body.results[0].data,
          "analytics": response.body.results[0].meta
        });
      } else {
        defer.reject({ 'message': 'There is an issue with the API server.', 'status': response.status });
      }
    });

    return defer.promise;
  }
};

module.exports = api;

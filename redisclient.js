'use strict'; 

const redis = require("redis")

var redisclient = function(options) {
  
  options.retry_strategy = function (options) {
    return Math.min(Math.max(options.attempt * 100, 3000),30000)
  }
  
  options.db = options.db || "0"

  var client = redis.createClient(options);

  client.on("error", function (err) {
      console.log("Error " + err);
  });

  client.on("connect", function () {
      //console.log("connected to redis server");
  });

  client.on("disconnect", function () {
      //console.log("disconnected from redis server");
  });

  client.on("reconnecting", function () {
      //console.log("reconnecting to redis server");
  });
  
  return client

}

module.exports = redisclient


    

'use strict'; 

var redis = require("redis")


var redisclient = function(db) {

  var client = redis.createClient({
      retry_strategy: function (options) {
          return Math.min(Math.max(options.attempt * 100, 3000),30000)
      },
      db: db
  });

  client.on("error", function (err) {
      console.log("Error " + err);
  });

  client.on("connect", function () {
      //console.log("connected to redis server".green);
  });

  client.on("disconnect", function () {
      console.log("disconnected from redis server".green);
  });

  client.on("reconnecting", function () {
      console.log("reconnecting to redis server".green);
  });
  

  
  return client

}

module.exports = redisclient


    

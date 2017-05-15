'use strict';

const EventEmitter = require('events').EventEmitter;
const redisclient  = require('./redisclient.js')
var db = 1
 
module.exports = function(namespace) {
  var rdc = new redisclient(db)
  var sub = new redisclient(db)
  
  return new Promise(function(resolve,reject) {
    var items = []
    rdc.keys(namespace+':*', function(e,keys){
      keys.sort()
      var counter = 0;
      for (let key of keys) {
        rdc.hgetall(key, function(e,obj) {                                       
          var name = key.replace(namespace+':','')
          items[name] = {}
          items[name].key = key
          Object.assign(items[name],obj)
          Object.assign(items[name],EventEmitter.prototype)
          items[name].setMaxListeners(0)
          items[name].set = function(setobj) {
            rdc.hmset(key,setobj)
          }
          if(counter == keys.length - 1) {
            syncUpdates(items)
            resolve(items)
          }
          counter++;  
        }) 
      }  
    })
  })
    
  function syncUpdates(items) {
    sub.psubscribe('__keyspace@'+db+'__:'+namespace+':*');
    sub.on("pmessage", function (channel, message) {
      //~ console.log(channel,message)
      var key = message.replace('__keyspace@'+db+'__:','')
      //console.log('update received for',key)
      rdc.hgetall(key, function(e,obj) {
        //console.log('syncing: ',key)                              
        let item = key.replace(namespace+':','')
        if (items[item]) {
          Object.assign(items[item],obj)
        }
      })
    })
  }  
       
}








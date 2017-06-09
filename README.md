# redisblue
Object manager and synchronizer for Redis

## Synopsis

Why go to the database asynchronously? Let the database update your object in memory when it changes. It's basically an in-memory db cache that automatically synchronizes updates to the DB.

What this module does:

Retrieves all records in a specified top level namespace and returns an array of objects.

Turns each object into an event emitter.

Syncs all changes made to the DB by any means to the objects in memory.

Object emits an event on an update from the DB.

Currently only works with hashes. If there is interest I will add other data types.

## Installation

    npm install redisblue
    
You will need to configure keyspace notifications in Redis. See [Redis Notifications](https://redis.io/topics/notifications)
 
## Usage

```js
var redisoptions = {}
redisoptions.db = "0"
redisoptions.host = "localhost"

const redisblue = require("redisblue")(redisoptions)
 
redisblue('namespace').then(function(items) {
  for (let i in items) {
    console.log(items[i].key)
    items[i].on('dbupdate',function() {
      console.log('dbupdate',items[i].key)
    })       
  }
})
```

The items object will be immediately updated if the key in Redis is updated by any means.
For a complet list of parameters that can be passed in redisoptions, see:  [node-redis options](https://github.com/NodeRedis/node_redis#options-object-properties)

## Motivation

I wrote this module to prevent having to make messy async db calls. My application needs to be aware of the db state of numerous objects to make logical decisions based on those states and interact with other applications using the same sets of objects.



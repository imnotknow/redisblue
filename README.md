# redisblue
Object manager and synchronizer for Redis

## Synopsis

Why go to the database asynchronously? Let the database update your object in memory when it changes.

## Installation

npm install redisblue

## Code Example

```js
const redisblue = require("redisblue")
 
redisblue('products').then(function(items) {
  for (let i in items) {
    console.log(items[i].key)
  }
})
```

The items object will be immediately updated if the key in Redis is updated by any means..

## Motivation

I wrote this module to prevent having to make messy async db calls. My application needs to be aware of the db state of numerous objects to make logical decisions based on those states and interact with other applications using the same sets of objects.

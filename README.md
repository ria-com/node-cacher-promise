node-cacher-promise
===================
Cache results of target function (if function return results in promise) 

example
=======

**Add cache cache opportunity for simple generator - testGenerator:**

```javascript
var Q = require("q"),
    cacher = require("cache-promise");

var testMethodPromise = function testMethodPromise (a) {
    return Q.delay(a+1, 1000);
};

cacher(testMethodPromise,[4],{ cacheTime: 3 }).done(function (data) {
    console.log('first launch: ' + data); // wait 1 sec and get '5'
    cacher(testMethodPromise,[4],3).done(function (data) { // { cacheTime: 3 } equivalent '3'
        console.log('second launch: ' + data); //  get '5' from cache immediately
    },onerror);
},onerror);

function onerror(err) {
    console.error(err.stack);
}
```


simple test
===========

**Start testing module:**

```sh
$ cd node-cache-wrapper
$ npm install
$ npm test
```

config
======

co-cacher use [config](https://github.com/lorenwest/node-config) module. 
Example of config (./config/default.js):
```javascript
module.exports = {
    // https://github.com/3rd-Eden/node-memcached
    memcached: {
        servers: 'localhost:11211', // You can either use: String, Array, Object
        options: {
            poolSize: 20
        }
    },
    cache: {
        expires: 120, // Default cache expires in seconds
        storage: 'memcached',
        key: {
            prefix: 'cw_',
            crc32: false
        }
    }
};
```

roadmap
=======

   * Add redis storage support

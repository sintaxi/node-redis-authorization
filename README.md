# redis-authorization

A simple level based authorization system built on redis.

## Instalation

I always recomend you bundle your dependencies with your application. To do
this, create a `package.json` file in the root of your project with the minimum
information...

    {
      "name": "yourapplication",
      "verson": "0.1.0",
      "dependencies": {
        "redis-authorization": "0.2.0"
      }
    }

Then run the following command using npm...

    npm install

OR, if you just want to start playing with the library run...

    npm install redis-authorization

## Docs

### require `redis-authorization` and pass in a redis (or nedis) client.

    var redis  = require("redis")
    var client = redis.createClient() 
    var auth   = require("redis-authorization")(client) 

### grant(resource, user, level, callback)

Adds a user to a resource at a specified auhtorization level.

    auth.grant("project:12", "uid:7", 3, function(reply){
      console.log(reply) // returns true
    })

### revoke(resource, user, callback)

Removes user from having access to a resource.

    auth.revoke("project:12", "uid:7", function(reply){
      console.log(reply) // returns true
    })

### authorizations(resource, callback)

Takes a resource and a callback and return the users that have acces to the
resource with thier permission level.

    auth.authorzations("project:12", function(reply){
      console.log(reply)
      // returns
      // {
      //   "uid:88": 3,
      //   "uid:49": 1,
      //   "uid:18": 2,
      //   "uid:73": 2
      // }
    })

### authorizationsByLevel(resource, callback)

Same as `auhtorizations()` but returns object by permissions level.

    auth.authorzationsByLevel("project:12", function(reply){
      console.log(reply)
      // returns
      // {
      //   1: [ "uid:49" ],
      //   2: [ "uid:18", "uid:73" ],
      //   3: [ "uid:88" ]
      // }
    })

### permissions(user, callback)

Accepts a user and returns all the resources along with permission level.

    auth.permissions("uid:27", function(reply){
      console.log(reply)
      // returns
      // {
      //   "project:4": 3,
      //   "project:7": 1,
      //   "project:6": 2,
      //   "project:2": 2
      // }
    }) 

### auth.permissionsByLevel(user, callback)

Similar to `permissions()` but returns users permissions by level.

    auth.permissionsByLevel("uid:27", function(reply){
      console.log(reply)
      // returns
      // {
      //   1: [ "project:7" ],
      //   2: [ "project:6", "project:2" ],
      //   3: [ "project:4" ]
      // }
    }) 

## License

Copyright 2011 Brock Whitten
All rights reserved.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

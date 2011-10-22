var testCase = require('nodeunit').testCase

var redis = require("redis")
var client = redis.createClient()

var redisAuthorization = require("../redis-authorization")
var auth = redisAuthorization(client)

module.exports = testCase({

  "should grant bob level 2 on building": function(test) {
    auth.grant("building:12", "bob", 2, function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should revoke bob on project 12": function(test) {
    auth.revoke("building:12", "bob", function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should not have any permissions on bob": function(test){
    auth.permissions("bob", function(reply){
      test.deepEqual(reply, {})
      test.done()
    })
  },

  "cleanup": function(test){
    client.flushall()
    client.quit()
    test.done()
  }

})

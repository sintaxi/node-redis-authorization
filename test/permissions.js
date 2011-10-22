var testCase = require('nodeunit').testCase

var redis = require("redis")
var client = redis.createClient()

var redisAuthorization = require("../redis-authorization")
var auth = redisAuthorization(client)

module.exports = testCase({

  "should get empty permissions for unkown person": function(test) {
    auth.permissions("cat", function(reply){
      test.deepEqual(reply, {})
      test.done()
    })
  },

  "should get empty permissionsByLevel for unkown person": function(test) {
    auth.permissions("cat", function(reply){
      test.deepEqual(reply, {})
      test.done()
    })
  },

  "should grant thom on room 12": function(test) {
    auth.grant("room:12", "thom", 2, function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should grant dick on room 12": function(test) {
    auth.grant("room:12", "dick", 2, function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should grant thom on room 13": function(test) {
    auth.grant("room:13", "thom", 3, function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should get authorizations": function(test) {
    auth.permissions("thom", function(reply){
      test.deepEqual(reply, {"room:12": 2, "room:13": 3})
      test.done()
    })
  },

  "should get authorizations by level": function(test) {
    auth.permissionsByLevel("thom", function(reply){
      test.deepEqual(reply[2], ["room:12"])
      test.deepEqual(reply[3], ["room:13"])
      test.done()
    })
  },

  "cleanup": function(test){
    client.flushall()
    client.quit()
    test.done()
  }

})

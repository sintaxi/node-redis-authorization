var testCase = require('nodeunit').testCase

var redisAuthorization = require("../redis-authorization")
var auth = new redisAuthorization.Client()

module.exports = testCase({

  "should get empty authorizations for unkown person": function(test) {
    auth.permissions("cat", function(reply){
      test.deepEqual(reply, {})
      test.done()
    })
  },

  "should get empty authorizationsByLevel for unkown person": function(test) {
    auth.permissions("cat", function(reply){
      test.deepEqual(reply, {})
      test.done()
    })
  },

  "should set sam in office 12": function(test) {
    auth.grant("office:12", "sam", 2, function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should set rob in office 12": function(test) {
    auth.grant("office:12", "rob", 2, function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should set brian on project 12": function(test) {
    auth.grant("office:12", "brian", 3, function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should get authorizations": function(test) {
    auth.authorizations("office:12", function(reply){
      test.deepEqual(reply, {"sam": 2, "brian": 3, "rob": 2})
      test.done()
    })
  },

  "should get authorizations by level": function(test) {
    auth.authorizationsByLevel("office:12", function(reply){
      test.deepEqual(reply[2].sort(), ["sam", "rob"].sort())
      test.deepEqual(reply[3].sort(), ["brian"].sort())
      test.done()
    })
  },

  "cleanup": function(test){
    var redis = require("redis")
    var client = redis.createClient()
    client.flushall()
    client.quit()

    auth.quit()
    test.done()
  }

})

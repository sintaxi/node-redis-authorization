var testCase = require('nodeunit').testCase

var redisAuthorization = require("../redis-authorization")
var auth = new redisAuthorization.Client()

module.exports = testCase({

  "should grant permission to level 2": function(test) {
    auth.grant("project:12", "brock", 2, function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should change permission to level 3": function(test) {
    auth.grant("project:12", "brock", 3, function(reply){
      test.ok(reply)
      test.done()
    })
  },

  "should have brock as level 3": function(test) {
    auth.authorizations("project:12", function(reply){
      test.deepEqual(reply, {"brock": 3})
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

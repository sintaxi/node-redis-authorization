var should = require("should")

describe('grant', function(){
  var redis = require("redis")
  var redisAuthorization = require("../redis-authorization")
  var client = redis.createClient()
  var auth = redisAuthorization(client)

  it('should grant permission to level 2', function(done){
    auth.grant("project:12", "brock", 2, function(reply){
      should.exist(reply)
      done()
    })
  })

  it('should change permission to level 3', function(done){
    auth.grant("project:12", "brock", 3, function(reply){
      should.exist(reply)
      done()
    })
  })

  it("should have brock as level 3", function(done) {
    auth.authorizations("project:12", function(reply){
      reply.should.eql({"brock": 3})
      done()
    })
  })

  after(function(){
    client.flushall()
    client.quit()
  })

})

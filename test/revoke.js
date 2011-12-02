var should = require('should')

describe('revoke', function(){
  var redis = require("redis")
  var client = redis.createClient()
  var redisAuthorization = require("../redis-authorization")
  var auth = redisAuthorization(client)

  it("should grant bob level 2 on building", function(done) {
    auth.grant("building:12", "bob", 2, function(reply){
      reply.should.be.true
      done()
    })
  })

  it("should revoke bob on project 12", function(done) {
    auth.revoke("building:12", "bob", function(reply){
      reply.should.be.true
      done()
    })
  })

  it("should not have any permissions on bob", function(done){
    auth.permissions("bob", function(reply){
      reply.should.eql({})
      done()
    })
  })

  after(function(){
    client.flushall()
    client.quit()
  })

})

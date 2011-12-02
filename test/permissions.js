var should = require('should')


describe('permissions', function(){
  var redis = require("redis")
  var client = redis.createClient()
  var redisAuthorization = require("../redis-authorization")
  var auth = redisAuthorization(client)

  it("should get empty permissions for unkown person", function(done) {
    auth.permissions("cat", function(reply){
      reply.should.eql({})
      done()
    })
  })

  it("should get empty permissionsByLevel for unkown person", function(done) {
    auth.permissions("cat", function(reply){
      reply.should.eql({})
      done()
    })
  })

  it("should grant thom on room 12", function(done) {
    auth.grant("room:12", "thom", 2, function(reply){
      reply.should.be.true
      done()
    })
  })

  it("should grant dick on room 12", function(done) {
    auth.grant("room:12", "dick", 2, function(reply){
      reply.should.be.true
      done()
    })
  })

  it("should grant thom on room 13", function(done) {
    auth.grant("room:13", "thom", 3, function(reply){
      reply.should.be.true
      done()
    })
  })

  it("should get authorizations", function(done) {
    auth.permissions("thom", function(reply){
      reply.should.eql({"room:12": 2, "room:13": 3})
      done()
    })
  })

  it("should get authorizations by level", function(done) {
    auth.permissionsByLevel("thom", function(reply){
      //test.deepEqual(reply[2], ["room:12"])
      //test.deepEqual(reply[3], ["room:13"])
      done()
    })
  })

  after(function(){
    client.flushall()
    client.quit()
  })

})

var should = require("should")

describe('authorizations', function(){
  var redis = require("redis")
  var redisAuthorization = require("../redis-authorization")
  var client = redis.createClient()
  var auth = redisAuthorization(client)

  it('should get empty authorizations for unkown person', function(done){
    auth.permissions("cat", function(reply){
      should.exist(reply)
      done()
    })
  })

  it("should get empty authorizationsByLevel for unkown person", function(done) {
    auth.permissions("cat", function(reply){
      reply.should.eql({})
      done()
    })
  })

  it("should set sam in office 12", function(done){
    auth.grant("office:12", "sam", 2, function(reply){
      should.exist(reply)
      done()
    })
  })

  it("should set rob in office 12", function(done) {
    auth.grant("office:12", "rob", 2, function(reply){
      should.exist(reply)
      done()
    })
  })

  it("should set brian on project 12", function(done) {
    auth.grant("office:12", "brian", 3, function(reply){
      should.exist(reply)
      done()
    })
  })

  it("should get authorizations", function(done) {
    auth.authorizations("office:12", function(reply){
      reply.should.eql({"sam": 2, "brian": 3, "rob": 2})
      done()
    })
  })

  it("should get authorizations by level", function(done) {
    auth.authorizationsByLevel("office:12", function(reply){
      reply.should.eql({ 2: [ "sam", "rob" ], 3: [ "brian" ] })
      done()
    })
  })

  after(function(){
    client.flushall()
    client.quit()
  })

})


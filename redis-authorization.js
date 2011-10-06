var redis = require("redis")

var Client = function(){
  this.redisClient = redis.createClient()
}

Client.prototype.grant = function(resource, user, level, cb){
  this.redisClient.multi()
  .zadd(resource + ":" + "authorizations", level, user)
  .zadd(user + ":" + "permissions", level, resource)
  .exec(function(err, replies){
    err ? cb(false) : cb(true)
  })
}

Client.prototype.revoke = function(resource, user, cb){
  this.redisClient.multi()
  .zrem(resource + ":" + "authorizations", user)
  .zrem(user + ":" + "permissions", resource)
  .exec(function(err, replies){
    err ? cb(false) : cb(true)
  })
}

Client.prototype.authorizations = function(resource, cb){
  this.redisClient.zrevrange(resource + ":authorizations", 0, -1, "WITHSCORES", function(err, reply){
    var obj = {}

    for(var i=0; i < (reply.length / 2); i++)(function(i){
      obj[reply[i * 2]] = reply[i * 2 + 1]
    })(i)

    cb(obj)
  })
}

Client.prototype.authorizationsByLevel = function(resource, cb){
  this.redisClient.zrevrange(resource + ":authorizations", 0, -1, "WITHSCORES", function(err, reply){
    var obj = {}

    for(var i=0; i < (reply.length / 2); i++)(function(i){
      var level = reply[i * 2 + 1]
      obj[level] || (obj[level] = [])
      obj[level].push(reply[i * 2])
    })(i)

    cb(obj)
  })
}

Client.prototype.permissions = function(user, cb){
  this.redisClient.zrevrange(user + ":permissions", 0, -1, "WITHSCORES", function(err, reply){
    var obj = {}

    for(var i=0; i < (reply.length / 2); i++)(function(i){
      obj[reply[i * 2]] = reply[i * 2 + 1]
    })(i)

    cb(obj)
  })
}

Client.prototype.permissionsByLevel = function(user, cb){
  this.redisClient.zrevrange(user + ":permissions", 0, -1, "WITHSCORES", function(err, reply){
    var obj = {}

    for(var i=0; i < (reply.length / 2); i++)(function(i){
      var level = reply[i * 2 + 1]
      obj[level] || (obj[level] = [])
      obj[level].push(reply[i * 2])
    })(i)

    cb(obj)
  })
}

Client.prototype.quit = function(){
  this.redisClient.quit()
}

exports.Client = Client


module.exports = function(client){

  return {

    grant: function(resource, user, level, cb){
      client.multi()
      .zadd(resource + ":" + "authorizations", level, user)
      .zadd(user + ":" + "permissions", level, resource)
      .exec(function(err, replies){
        err ? cb(false) : cb(true)
      })
    },

    revoke: function(resource, user, cb){
      client.multi()
      .zrem(resource + ":" + "authorizations", user)
      .zrem(user + ":" + "permissions", resource)
      .exec(function(err, replies){
        err ? cb(false) : cb(true)
      })
    },

    authorizations: function(resource, cb){
      client.zrevrange(resource + ":authorizations", 0, -1, "WITHSCORES", function(err, reply){
        var obj = {}

        for(var i=0; i < (reply.length / 2); i++)(function(i){
          obj[reply[i * 2]] = reply[i * 2 + 1]
        })(i)

        cb(obj)
      })
    },

    authorizationsByLevel: function(resource, cb){
      client.zrevrange(resource + ":authorizations", 0, -1, "WITHSCORES", function(err, reply){
        var obj = {}

        for(var i=0; i < (reply.length / 2); i++)(function(i){
          var level = reply[i * 2 + 1]
          obj[level] || (obj[level] = [])
          obj[level].push(reply[i * 2])
        })(i)

        cb(obj)
      })
    },

    permissions: function(user, cb){
      client.zrevrange(user + ":permissions", 0, -1, "WITHSCORES", function(err, reply){
        var obj = {}

        for(var i=0; i < (reply.length / 2); i++)(function(i){
          obj[reply[i * 2]] = reply[i * 2 + 1]
        })(i)

        cb(obj)
      })
    },

    permissionsByLevel: function(user, cb){
      client.zrevrange(user + ":permissions", 0, -1, "WITHSCORES", function(err, reply){
        var obj = {}

        for(var i=0; i < (reply.length / 2); i++)(function(i){
          var level = reply[i * 2 + 1]
          obj[level] || (obj[level] = [])
          obj[level].push(reply[i * 2])
        })(i)

        cb(obj)
      })
    }

  }
}

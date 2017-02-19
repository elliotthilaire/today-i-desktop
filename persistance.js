var Datastore = require('nedb')
var db = new Datastore({ filename: 'tmp/db.txt' })

db.loadDatabase(function (_err) {
    // Start issuing commands after callback...
})

function insert (data) {
  db.insert(data, function (_err, doc) {
    console.log('Inserted', doc)
  })
}

function remove (data) {
  console.log('might remove', data)
  db.remove(data, {}, function (err, numRemoved) {
    console.log('removed: ' + numRemoved)
  })
}

function list (callback) {
  db.find({}, function (err, docs) {
    docs.forEach(function(element) {
      console.log('sending request' + element)
      callback(element)
    })
  })
}

module.exports = {
  insert: insert,
  remove: remove,
  list: list
}

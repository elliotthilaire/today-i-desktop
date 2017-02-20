var Datastore = require('nedb')
var db = new Datastore({ filename: 'tmp/db.txt' })

db.loadDatabase(function (_err) {
  //
})

function insert (element) {
  db.insert(element, function (_err, doc) {
    console.log('inserted', doc)
  })
}

function remove (element) {
  db.remove(element, {}, function (_err, _numRemoved) {
    console.log('removed', element)
  })
}

function each (callback) {
  db.find({}, function (_err, docs) {
    docs.forEach(function (element) {
      callback(element)
    })
  })
}

module.exports = {
  insert: insert,
  remove: remove,
  each: each
}

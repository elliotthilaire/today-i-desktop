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


module.exports = {
  insert: insert
}

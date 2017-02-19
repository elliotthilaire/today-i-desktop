var request = require('request')
var Datastore = require('nedb')
var db = new Datastore({ filename: 'tmp/db.txt' })

function sendRequest (data) {
  var options = {
    url: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data)
  }
  console.log('sending request')
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('sent request' + body)
      deleteEntry(data)
    }
  })
}

function deleteEntry (data) {
  db.remove(data, {}, function (err, numRemoved) {
    console.log('removed: ' + numRemoved)
  })
}

db.loadDatabase(function (_err) {
    // Start issuing commands after callback...
})

function run () {
  db.find({}, function (err, docs) {
    console.log('found docs' + docs)
    console.log(err)
    docs.forEach(function(element) {
      console.log('sending request' + element)
      sendRequest(element)
    })
  })
}

module.exports = {
  run: run
}

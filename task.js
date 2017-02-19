var http = require('http')
var Datastore = require('nedb')
var db = new Datastore({ filename: 'tmp/db.txt' })

function sendRequest (data) {
  var options = {
    hostname: 'localhost',
    port: 59835,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  }

  var req = http.request(options, (res) => {
    console.log('res' + res)
  })
  req.on('error', (error) => {
    console.log('could not send' + error)
  })
  var body = JSON.stringify(data)
  req.end(body)
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
    docs.forEach(function(element) {
      console.log(element)

      sendRequest(element)
    })
  })
}

module.exports = {
  run: run
}

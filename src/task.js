const EventEmitter = require('events')

const emitter = new EventEmitter()

var request = require('request')

function sendRequest (data) {
  var defaultOptions = {
    method: 'POST',
    url: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data)
  }

  var customOptions = {
    method: 'GET',
    url: 'http://localhost:4000',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }

  var options = Object.assign({}, defaultOptions, customOptions)

  console.log('sending request')
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('emit success')
      emitter.emit('success', data)
    } else {
      console.log('emit failure')
      emitter.emit('failure', data)
    }
  })
}

emitter.run = sendRequest

module.exports = emitter

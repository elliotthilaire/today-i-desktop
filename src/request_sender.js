const EventEmitter = require('events')
const emitter = new EventEmitter()
const request = require('request')

module.exports = function (options) {
  //
  var requestOptions = options

  function sendRequest (data) {
    var defaultOptions = {
      method: 'POST',
      url: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data)
    }

    var options = Object.assign({}, defaultOptions, requestOptions)
    console.log(options)

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

  return emitter
}

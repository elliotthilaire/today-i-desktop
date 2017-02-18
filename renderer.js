const {ipcRenderer} = require('electron')

var form = document.getElementById('form')

form.addEventListener('submit', submit)

form.addEventListener('keyup', function (event) {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault()
    submit()
  }
})

function submit (event) {
  ipcRenderer.send('hide-window')

  var data = {
    text: 'hello world',
    submitted_at: new Date()
  }

  sendRequest(data)
}

function sendRequest (data) {
  var request = new XMLHttpRequest()
  request.open('POST', 'http://localhost:55274/', true)
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
  request.send(JSON.stringify(data))
}

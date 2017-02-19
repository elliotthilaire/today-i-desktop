const {ipcRenderer} = require('electron')



var form = document.getElementById('form')

form.addEventListener('keydown', function (event) {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault()
    var text = document.getElementById('textInput').value
    submit(text)
    form.reset()
  }
})

function submit (text) {
  ipcRenderer.send('hide-window')

  var data = {
    text: text,
    submitted_at: new Date()
  }

  sendRequest(data)
}

function sendRequest (data) {
  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    ipcRenderer.send('persist-data', data)

    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log('sent')
      } else {
        console.log('nope')
      }
    }
  }

  request.open('POST', 'http://localhost:58393/', true)
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
  request.send(JSON.stringify(data))
}

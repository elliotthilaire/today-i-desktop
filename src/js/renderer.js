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

  var data = {
    text: text,
    submitted_at: new Date()
  }

  ipcRenderer.send('hide-window')
  ipcRenderer.send('handle-data', data)
}

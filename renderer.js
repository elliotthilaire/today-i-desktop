
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
  form.submit()
}

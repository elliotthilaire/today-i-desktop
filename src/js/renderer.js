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

var quit = document.getElementById('quit')
quit.addEventListener('click', function (event) {
  ipcRenderer.send('quit')
})

var debug = document.getElementById('debug')
debug.addEventListener('click', function (event) {
  ipcRenderer.send('debug')
})


// register context meny and copy and paste support for input box
const inputMenu = require('electron-input-menu')
const context = require('electron-contextmenu-middleware')

inputMenu.registerShortcuts()
context.use(inputMenu)
context.activate()

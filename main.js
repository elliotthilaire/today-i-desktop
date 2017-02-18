// In main process.
const {ipcMain} = require('electron')

ipcMain.on('hide-window', (event) => {
  event.returnValue = 'ok'
  mb.hideWindow()
})


var menubar = require('menubar')

var mb = menubar({
  height: 200
})

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
  mb.hideWindow()
})

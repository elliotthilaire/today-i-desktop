const {ipcMain} = require('electron')
const menubar = require('menubar')

ipcMain.on('hide-window', (event) => {
  event.returnValue = 'ok'
  mb.hideWindow()
})



var mb = menubar({
  height: 200
})

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
  mb.hideWindow()
})

const {ipcMain} = require('electron')
const menubar = require('menubar')

const persistance = require('./persistance.js')

var mb = menubar({
  height: 200
})

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
  mb.hideWindow()
})

ipcMain.on('hide-window', (event) => {
  mb.hideWindow()
})

ipcMain.on('persist-data', (event, data) => {
  persistance.insert(data)
})

mb.on('after-create-window', (event) => {
  mb.window.webContents.openDevTools()
})


var task = require('./task.js')
var cron = require('node-cron')

cron.schedule('* * * * *', function () {
  console.log('running a task')
  task.run()
})

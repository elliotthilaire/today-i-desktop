const {ipcMain} = require('electron')
const menubar = require('menubar')

const persistance = require('./persistance.js')

var mb = menubar({
  height: 200
})

mb.on('ready', function () {
  console.log('app is ready')
  // your app code here
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


var cron = require('node-cron')

cron.schedule('* * * * *', function () {
  console.log('running a task')
  runTasks()
})


var task = require('./task.js')

task.on('success', function (data) {
  persistance.remove(data)
})



function runTasks () {
  persistance.list(task.run)
}

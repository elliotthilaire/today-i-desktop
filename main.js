const {ipcMain} = require('electron')
const menubar = require('menubar')

const repo = require('./repo.js')

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
  repo.insert(data)
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
  repo.remove(data)
})


function runTasks () {
  repo.each(task.run)
}

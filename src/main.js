const {ipcMain} = require('electron')
const menubar = require('menubar')

const repo = require('./repo.js')

var app = menubar({height: 200})

app.on('ready', function () {
  console.log('app is ready')
})

app.on('after-create-window', (event) => {
  // app.window.webContents.openDevTools()
})

ipcMain.on('hide-window', (event) => {
  app.hideWindow()
})

ipcMain.on('persist-data', (event, data) => {
  repo.insert(data)
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

const {ipcMain} = require('electron')
const menubar = require('menubar')

var app = menubar({height: 200})

var dbPath = app.app.getPath('home')
var storageLocation = `${dbPath}/.today-i-db.js`

const repo = require('./repo.js')(storageLocation)

app.on('ready', function () {
  console.log('app is ready')
})

app.on('after-create-window', (event) => {
  // app.window.webContents.openDevTools()
})

ipcMain.on('hide-window', (event) => {
  app.hideWindow()
})

ipcMain.on('handle-data', (event, data) => {
  repo.insert(data)
  runTasks()
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

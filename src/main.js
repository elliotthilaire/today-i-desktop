const {ipcMain} = require('electron')
const menubar = require('menubar')


// initialize menubar
var mb = menubar({height: 200})


// read config
const homePath = mb.app.getPath('home')
const config = require('./config_reader.js')(homePath)


// setup listeners
mb.on('ready', function () {
  console.log('app is ready')
})

mb.on('after-create-window', (event) => {
  // mb.window.webContents.openDevTools()
})


const repo = require('./repo.js')(config.storageFile)

// initialize ipc channels
ipcMain.on('hide-window', (event) => {
  mb.hideWindow()
})

ipcMain.on('quit', (event) => {
  mb.app.quit()
})

ipcMain.on('handle-data', (event, data) => {
  repo.insert(data)
  runTasks()
})


// setup schedular
var cron = require('node-cron')

cron.schedule('* * * * *', function () {
  console.log('running a task')
  runTasks()
})

function runTasks () {
  repo.each(requestSender.run)
}


// setup request sender
var requestSender = require('./request_sender.js')(config.requestConfig)

requestSender.on('success', function (data) {
  repo.remove(data)
})

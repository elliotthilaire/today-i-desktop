const {ipcMain} = require('electron')
const menubar = require('menubar')

// initialize menubar
var mb = menubar({height: 200})

// read config
const homePath = mb.app.getPath('home')
const config = require('./config_reader.js')(homePath)

// initialize repo
const repo = require('./repo.js')(config.storageFile)

// initialize request_sender
var requestSender = require('./request_sender.js')(config.requestConfig)


// setup mb listeners
mb.on('ready', function () {
  console.log('app is ready')
})

mb.on('after-create-window', (event) => {
  // mb.window.webContents.openDevTools()
})


// ipc channel listeners
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


// setup request sender
requestSender.on('success', function (data) {
  repo.remove(data)
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

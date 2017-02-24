const {ipcMain} = require('electron')
const menubar = require('menubar')



// initialize menubar
var mb = menubar({height: 200})

mb.on('ready', function () {
  console.log('app is ready')
})

mb.on('after-create-window', (event) => {
  // mb.window.webContents.openDevTools()
})



// setup repository
var configPath = mb.app.getPath('home')
var storageLocation = `${configPath}/.today-i-db.js`

const repo = require('./repo.js')(storageLocation)



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



// setup requestSender
var configFile = findConfigFile()
function findConfigFile () {
  if (process.env.TODAY_I_CONFIG) {
    return process.env.TODAY_I_CONFIG
  } else {
    return `${configPath}/.today-i-config.js`
  }
}
var requestConfig = require(configFile).config

var requestSender = require('./request_sender.js')(requestConfig)

requestSender.on('success', function (data) {
  repo.remove(data)
})

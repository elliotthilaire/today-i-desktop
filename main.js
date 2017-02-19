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


var cron = require('node-cron')

cron.schedule('* * * * *', function () {
  console.log('running a task')
  runTasks()
})

//dfdf
var request = require('request')
function sendRequest (data) {
  var options = {
    url: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data)
  }
  console.log('sending request')
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('sent request' + body)
      persistance.remove(data)
    }
  })
}


function runTasks () {
  persistance.list(sendRequest)
}

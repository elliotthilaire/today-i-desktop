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



var Datastore = require('nedb')
var db = new Datastore({ filename: 'tmp/db.txt' })

db.loadDatabase(function (_err) {
    // Start issuing commands after callback...
})

ipcMain.on('persist-data', (event, data) => {
  db.insert(data, function (_err, doc) {
    console.log('Inserted', doc.data, 'with ID', doc._id)
  })
})


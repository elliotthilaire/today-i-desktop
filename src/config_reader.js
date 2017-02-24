const path = require('path');

module.exports = function (homePath) {

  const configPath = homePath

  var storageFile = findStorageFile()
  function findStorageFile() {
    return `${configPath}/.today-i-db.js`
  }


  var configFile = findConfigFile()
  function findConfigFile () {
    if (process.env.TODAY_I_CONFIG) {
      return process.env.TODAY_I_CONFIG
    } else {
      return `${configPath}/.today-i-config.js`
    }
  }

  const requestConfig = require(configFile).config

  return {
    storageFile: storageFile,
    requestConfig: requestConfig
  }
}

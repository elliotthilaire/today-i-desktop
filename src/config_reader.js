const path = require('path');

function findStorageFile() {
  if (process.env.TODAY_I_STORAGE_FILE) {
    return process.env.TODAY_I_STORAGE_FILE
  } else {
    return `${configPath}/.today-i-db.js`
  }
}

function findConfigFile () {
  if (process.env.TODAY_I_CONFIG) {
    return process.env.TODAY_I_CONFIG
  } else {
    return `${configPath}/.today-i-config.js`
  }
}

module.exports = function (homePath) {

  const configPath = homePath

  const configFile = findConfigFile()
  const requestConfig = require(configFile).config

  return {
    storageFile: findStorageFile(),
    requestConfig: requestConfig
  }
}

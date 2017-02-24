const path = require('path');

function findStorageFile (configPath) {
  if (process.env.TODAY_I_STORAGE_FILE) {
    return process.env.TODAY_I_STORAGE_FILE
  } else {
    return `${configPath}/.today-i-db.js`
  }
}

function findConfigFile (configPath) {
  if (process.env.TODAY_I_CONFIG) {
    return process.env.TODAY_I_CONFIG
  } else {
    return `${configPath}/.today-i-config.js`
  }
}

module.exports = function (homePath) {

  const configPath = path.join(homePath, '.config', 'today-i')

  const configFile = findConfigFile(configPath)
  const requestConfig = require(configFile).config

  return {
    storageFile: findStorageFile(configPath),
    requestConfig: requestConfig
  }
}

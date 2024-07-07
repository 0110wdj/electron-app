const fs = require("node:fs");
const path = require('node:path')
const OS = process.platform;
let personalDataPath;

const dir = "personal-weight-data";

if (OS === 'win32') {
  personalDataPath = path.join(process.env.APPDATA, dir)
} else if (OS === 'darwin') {
  personalDataPath = path.join(process.env.HOME, 'Library', 'Application Support', dir)
} else if (OS === 'linux') {
  personalDataPath = path.join(process.env.HOME, '.config', dir)
} else {
  throw new Error('Unsupported operating system')
}

/**
 * 检查文件是否存在,不存在则创建
 * @returns {boolean}
 */
const fileCheck = () => {
  // 检查当前目录下是否存在 personal-data 目录，如果不存在，则创建
  try {
    if (!fs.existsSync(personalDataPath)) {
      console.log('❗️ data directory does not exist, creating...');
      fs.mkdirSync(personalDataPath)
    } else {
      console.log('✅ data directory exists');
    }

    // 检查当前目录下是否存在 personal-data/data.json 文件，如果不存在，则创建
    const dataFilePath = path.join(personalDataPath, 'data.json')
    if (!fs.existsSync(dataFilePath)) {
      console.log('❗️ data.json file does not exist, creating...');
      fs.writeFileSync(dataFilePath, '[]')
    } else {
      console.log('✅ data.json file exists');
    }
    return true
  } catch (error) {
    console.error('❌ Error checking or creating files:', error)
    return false
  }
}

module.exports = {
  fileCheck
}
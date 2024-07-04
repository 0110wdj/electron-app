// const fs = require("electron-fs");
// const path = require('node:path')

const fileCheck = () => {
  // 检查当前目录下是否存在 personal-data 目录，如果不存在，则创建
  // const personalDataPath = path.join(__dirname, 'personal-data')
  // if (!fs.existsSync(personalDataPath)) {
  //   fs.mkdirSync(personalDataPath)
  // }

  // // 检查当前目录下是否存在 personal-data/data.json 文件，如果不存在，则创建
  // const dataFilePath = path.join(personalDataPath, 'data.json')
  // if (!fs.existsSync(dataFilePath)) {
  //   fs.writeFileSync(dataFilePath, '[]')
  // }

  console.log('fileCheck completed');
}

module.exports = {
  fileCheck
}
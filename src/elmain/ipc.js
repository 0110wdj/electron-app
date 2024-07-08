const { ipcMain } = require('electron');
const fs = require('node:fs');
const path = require('node:path')
const { getDataPath } = require('./filecrud.js');

console.log("load ipc");

function readFileAsync(path, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const fsReadasync = async (url) => {
  try {
    const data = await readFileAsync(url, 'utf-8')
    return data
  } catch (error) {
    console.error(`读取文件内容失败:\n${error.message}`);
    return null
  }
}

ipcMain.on("getDataJson", (e) => {
  console.log("收到数据请求 getDataJson");
  try {
    const dirpath = getDataPath();
    const url = path.join(dirpath, 'data.json')

    fsReadasync(url).then((data) => {
      console.log("读取文件成功", data);
      e.returnValue = data;
    })

  } catch (error) {
    console.error(error);
    e.returnValue = null;
  }
});

// ipcMain.on("add-data-json", "{val:100,time:'2023-06-02'}", (event, arg) => {
//   console.log("Received data from renderer:", arg);
// });
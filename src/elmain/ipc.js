const { ipcMain } = require('electron');
const fs = require('node:fs');
const path = require('node:path')
const { getDataPath } = require('./filecrud.js');

console.log("load ipc");

ipcMain.on("getDataJson", (event) => {

  console.log("收到数据请求 getDataJson");

  try {
    const dirpath = getDataPath();
    const personalDataPath = path.join(dirpath, 'data.json')
    console.log("personalDataPath", personalDataPath);

    fs.readFile(personalDataPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        event.returnValue = Promise.reject(err);
        return;
      }
      console.log("data", data);
      event.returnValue = Promise.resolve(data.toString());
    });

  } catch (error) {
    console.error(error);
    event.returnValue = Promise.reject(error);
  }
});

// ipcMain.on("add-data-json", "{val:100,time:'2023-06-02'}", (event, arg) => {
//   console.log("Received data from renderer:", arg);
// });
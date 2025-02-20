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
  try {
    const dirpath = getDataPath();
    const url = path.join(dirpath, 'data.json')

    fsReadasync(url).then((data) => {
      e.returnValue = data;
    })
  } catch (error) {
    console.error(error);
    e.returnValue = null;
  }
});

ipcMain.on("addDataJson", (e, val) => {
  try {
    const dirpath = getDataPath();
    const url = path.join(dirpath, 'data.json')

    fsReadasync(url).then((data) => {
      const fileJson = JSON.parse(data);
      fileJson.push({ val, time: new Date().toLocaleString() });
      fs.writeFileSync(url, JSON.stringify(fileJson, null, 2));
      console.log("addDataJson success");
      e.returnValue = true;
    })

  } catch (error) {
    console.error(error);
    e.returnValue = false;
  }
});

ipcMain.on('openDevTools', e => {
  e.sender.openDevTools();
});

ipcMain.on("downloadData", (e, start, end) => {
  try {
    const dirpath = getDataPath();
    console.log({ dirpath, start, end });
    e.returnValue = true;
  } catch (error) {
    console.error(error);
    e.returnValue = false;
  }
});

ipcMain.on("clearData", (e) => {
  try {
    const dirpath = getDataPath();
    console.log({ dirpath });
    e.returnValue = true;
  } catch (error) {
    console.error(error);
    e.returnValue = false;
  }
});
const { ipcMain } = require('electron');
const fs = require('node:fs');
const path = require('node:path')
const { getDataPath } = require('./filecrud.js');
const { getUrlList } = require('../components/kits/getUrlList.js');
const { run } = require('../components/kits/getDetial.js');
// import getZipStream from './kits/getZipStream'

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

    getUrlList(+start, +end).then(data => {
      console.log('===> complete getUrlList');
      const array = data.toString().split('\n').filter(i => i)
      console.log({ array });

      run(array).then(() => {
        e.returnValue = null;
        console.log('===> complete getDetial');
        // getZipStream(response).then((res) => {
        //   console.log('===> complete getDetial');
        //   e.returnValue = res;
        // })
      })
    })
  } catch (error) {
    console.error(error);
    e.returnValue = null;
  }
});

ipcMain.on("clearData", (e) => {
  try {
    const dirpath = getDataPath();
    const filesToCompress = ['./unit.txt', './time.txt', './title.txt', './context.txt', './urlList.txt', './compressed_files.zip']; // 要压缩的文件列表
    const pathUrl = filesToCompress.map(UrlListFile => path.resolve(dirpath, UrlListFile))
    filesToCompress.forEach(url => {
      if (fs.existsSync(url)) {
        fs.unlinkSync(url);
      } else {
        console.log("not found:" + url);
      }
    })
    pathUrl.forEach(url => {
      if (fs.existsSync(url)) {
        fs.unlinkSync(url);
      } else {
        console.log("not found:" + url);
      }
    })
    e.returnValue = true;
  } catch (error) {
    console.error(error);
    e.returnValue = false;
  }
});
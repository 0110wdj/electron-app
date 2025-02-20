const fs = require('node:fs');
const path = require('node:path')
const { getDataPath } = require('../../elmain/filecrud.js');
const archiver = require('archiver-promise');
const { dialog } = require('electron');

const filesToCompress = ['./unit.txt', './time.txt', './title.txt', './context.txt', './urlList.txt']; // 要压缩的文件列表

const getZipStream = async () => {
  const dirpath = getDataPath();
  const outputZip = path.resolve(dirpath, './compressed_files.zip'); // 输出的 ZIP 文件名

  // 创建一个输出流到压缩文件
  const output = fs.createWriteStream(outputZip);
  const archive = archiver(outputZip, {
    zlib: { level: 9 } // 压缩级别，9 是最高级别
  });

  // 将输出流传递给 archiver
  await archive.pipe(output);

  // 将文件添加到压缩包
  filesToCompress.forEach(function (file) {
    const filePath = path.resolve(dirpath, file);
    archive.file(filePath, { name: file });
  });

  // 完成压缩
  await archive.finalize();

  await downloadFile(outputZip)
  return Promise.resolve()
}


const downloadFile = async (filePath) => {
  // 弹出保存文件对话框
  const result = await dialog.showSaveDialog({
    defaultPath: path.basename(filePath),
    filters: [{ name: 'All Files', extensions: ['*'] }],
  });

  if (!result.canceled && result.filePath) {
    try {
      // 读取本地文件并写入到用户选择的路径
      fs.copyFile(filePath, result.filePath, (err) => {
        if (err) {
          console.error('File copy error:', err);
        } else {
          console.log('File successfully downloaded!');
        }
      });
    } catch (error) {
      console.error('Error during file download:', error);
    }
  }
}


module.exports = {
  getZipStream
}
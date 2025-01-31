const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const { mainIndex } = require('./elmain/index.js')

require('./elmain/ipc.js');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {

  const isDev = (await import('electron-is-dev')).default;
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    // In development, load the local server URL
    mainWindow.loadURL('http://localhost:9000');
    // 改为 F12 打开
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
  } else {
    // In production, load the index.html file from the build directory
    // mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
    // mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // In production, load the index.html file from the build directory
    const indexPath = path.join(app.getAppPath(), 'dist', 'index.html');
    console.log('Loading index.html from:', indexPath);
    mainWindow.loadFile(indexPath).catch(err => {
      console.error('Failed to load index.html:', err);
    });
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  try {
    mainIndex()
    createWindow();

  } catch (error) {
    console.error(error);
    app.quit()
  }

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('quit', () => {
  console.log('程序退出');
  // 清理进程
  app.quit()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

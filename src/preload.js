const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('__ipc', {
  getDataJson: () => {
    console.log('getDataJson');
    return ipcRenderer.sendSync('getDataJson')
  },
});
const { contextBridge, ipcRenderer } = require('electron')

console.log('preload.js loaded');

contextBridge.exposeInMainWorld('__ipc', {
  getDataJson: () => {
    console.log('contextBridge.exposeInMainWorld call getDataJson');
    return ipcRenderer.sendSync('getDataJson')
  },
});
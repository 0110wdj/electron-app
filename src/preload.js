const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('__ipc', {
  getDataJson: async () => {
    return await ipcRenderer.sendSync('getDataJson')
  },
  addDataJson: async (val) => {
    return await ipcRenderer.sendSync('addDataJson', val)
  },
  openDevTools: () => ipcRenderer.send('openDevTools'),
});
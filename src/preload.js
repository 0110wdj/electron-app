const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('__ipc', {
  getDataJson: async () => {
    return await ipcRenderer.sendSync('getDataJson')
  },
  downloadData: async (start, end) => {
    return await ipcRenderer.sendSync('downloadData', start, end)
  },
  clearData: async () => {
    return await ipcRenderer.sendSync('clearData')
  },
  addDataJson: async (val) => {
    return await ipcRenderer.sendSync('addDataJson', val)
  },
  openDevTools: () => ipcRenderer.send('openDevTools'),
});
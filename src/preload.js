const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('__ipc', {
  getDataJson: async () => {
    return await ipcRenderer.sendSync('getDataJson')
  },
});
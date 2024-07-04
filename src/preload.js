// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
window.removeEventListener('DOMContentLoaded');

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
});
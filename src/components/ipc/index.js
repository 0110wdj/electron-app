/**
 * @type {{
*   getDataJson: () => Promise<string>,
*   addDataJson: (arg:string) => boolean,
*   openDevTools: () => void,
* }}
*/
const ipc = globalThis.__ipc;

export default ipc;
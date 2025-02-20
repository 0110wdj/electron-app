/**
 * @type {{
*   getDataJson: () => Promise<string>,
*   addDataJson: (arg:string) => boolean,
*   downloadData: (start:number,end:number) => boolean,
*   clearData: () => boolean,
*   openDevTools: () => void,
* }}
*/
const ipc = globalThis.__ipc;

export default ipc;
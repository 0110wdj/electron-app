/**
 * @type {{
*   getDataJson: () => Promise<string>,
*   addDataJson: (arg:string) => boolean,
* }}
*/
const ipc = globalThis.__ipc;

export default ipc;
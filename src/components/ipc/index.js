/**
 * @type {{
*   getDataJson: () => string,
*   addDataJson: (arg:string) => boolean,
* }}
*/
const ipc = globalThis.__ipc;

console.log({ ipc });

export default ipc;
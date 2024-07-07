/**
 * @type {{
*   getDataJson: () => Promise<string>,
*   addDataJson: (arg:string) => boolean,
* }}
*/
const ipc = globalThis.__ipc;

console.log({ ipc });

export default ipc;
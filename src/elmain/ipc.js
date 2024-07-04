import { ipcMain } from "electron";
import fs from "node:fs";

console.log("load ipc");


ipcMain.on("getDataJson", (event,) => {
  const path = "../personal-data/data.json";


  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  event.returnValue = [
    {
      "val": 124,
      "time": "1023-07-12"
    },
    {
      "val": 103,
      "time": "1024-07-12"
    },
    {
      "val": 94,
      "time": "1025-07-12"
    }
  ];
});

ipcMain.on("add-data-json", "{val:100,time:'2023-06-02'}", (event, arg) => {
  console.log("Received data from renderer:", arg);
});
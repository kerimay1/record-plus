const { app, BrowserWindow } = require("electron");
const path = require("path");
app.on("ready", () => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.loadFile("template/index.html");
});

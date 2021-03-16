const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { save, load } = require("./fileHandler");

let win;
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  // win.loadFile('index.html')
  //
  // if production/packaged version
  if (process.env.NODE_ENV === "production") {
    win.loadFile("build/index.html");
  } else {
    win.loadURL("http://localhost:3000");
  }
  // Open the DevTools.
  // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("load", (event, args) => {
  console.log(`Got "${args}" from renderer`);
  const transactions = load();
  win.webContents.send("load", transactions);
});
ipcMain.on("save", (event, args) => {
  console.log(`Got "${args}" from renderer`);
  let res = {};
  try {
    save(args.transactions, __dirname + "saves/default.json");
    res = { status: 200, msg: "Save Successful" };
  } catch (err) {
    res = { status: 500, msg: "Error: Save Failed" };
  }
  win.webContents.send("save", res);
});

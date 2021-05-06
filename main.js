const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const path = require("path");
const { save, load } = require("./fileHandler");

let win;
function createWindow() {
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

  // if production/packaged version
  if (process.env.NODE_ENV === "production") {
    win.loadFile("build/index.html");
  } else {
    win.loadURL("http://localhost:3000");
  }
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

async function doLoad() {
  try {
    let chooser = await dialog.showOpenDialog(win, {
      filters: [{ name: "JSON", extensions: ["json"] }],
      properties: ["openFile", "dontAddToRecent"],
    });
    if (chooser.filePaths.length === 1 && !chooser.canceled) {
      let transactions = load(chooser.filePaths[0]);
      win.webContents.send("load", transactions);
    } else if (chooser.filePaths.length !== 1 && !chooser.canceled) {
      throw new Error("Load failed");
    }
  } catch (err) {
    dialog.showErrorBox("Load Failed", "Selected file could not be opened.");
    res = { status: 500, msg: "Error: Load Failed" };
  }
}

async function doSave(event, args) {
  let res = {};
  try {
    let chooser = await dialog.showSaveDialog(win, {
      defaultPath: "money-man-save.json",
      filters: [{ name: "JSON", extensions: ["json"] }],
      properties: [
        "showOverwriteConfirmation",
        "createDirectory",
        "dontAddToRecent",
      ],
    });
    if (chooser.filePath && !chooser.canceled) {
      save(args.transactions, path.join(chooser.filePath));
      res = { status: 200, msg: "Save Successful" };
    } else if (chooser.canceled) {
      res = { status: 200, msg: "Save Canceled" };
    } else {
      throw new Error("Save Failed");
    }
  } catch (err) {
    res = { status: 500, msg: "Error: Save Failed" };
  } finally {
    win.webContents.send("save", res);
  }
}

ipcMain.on("load", doLoad);
ipcMain.on("save", doSave);

Menu.setApplicationMenu(
  Menu.buildFromTemplate([
    { role: "appMenu" },
    {
      label: "File",
      submenu: [
        {
          label: "New",
          accelerator: process.platform === "darwin" ? "Cmd+n" : "Ctrl+n",
          click: () => {
            console.log("Clicked menu New");
          },
        },
        { type: "separator" },
        {
          label: "Open...",
          accelerator: process.platform === "darwin" ? "Cmd+o" : "Ctrl+o",
          click: async () => {
            await doLoad();
          },
        },
        { type: "separator" },
        {
          label: "Save",
          accelerator: process.platform === "darwin" ? "Cmd+s" : "Ctrl+s",
          click: () => {
            win.webContents.send("reqSave");
          },
        },
        { type: "separator" },
        process.platform === "darwin" ? { role: "close" } : { role: "quit" },
      ],
    },
    { role: "editMenu" },
    { role: "viewMenu" },
    { role: "windowMenu" },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://github.com/liampalmer0/MoneyMan");
          },
        },
      ],
    },
  ])
);

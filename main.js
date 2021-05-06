const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const path = require("path");
const { save, load } = require("./fileHandler");

let win;
let activeFile = "";
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    title: "Money Man",
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

/**
 * Returns base file name from given file path
 *
 * @param {String} filepath
 * @returns {String} base filename
 */
function getBasename(filepath) {
  if (process.platform === "win32") {
    return path.win32.basename(filepath, ".json");
  } else {
    return path.posix.basename(filepath, ".json");
  }
}

/**
 * Updates window title with given filename
 *
 * @param {String} filename
 */
function updateTitle(filename) {
  win.title = `Money Man - ${filename}`;
}

/**
 * Load saved money man file
 * Sets activeFile newly loaded file
 */
async function doLoad() {
  try {
    let chooser = await dialog.showOpenDialog(win, {
      filters: [{ name: "JSON", extensions: ["json"] }],
      properties: ["openFile", "dontAddToRecent"],
    });

    if (chooser.filePaths.length === 1 && !chooser.canceled) {
      activeFile = chooser.filePaths[0];
      let transactions = load(activeFile);
      filename = getBasename(activeFile);
      updateTitle(filename);
      win.webContents.send("load", {
        status: 200,
        msg: "Load successful",
        filename,
        transactions,
      });
    } else if (chooser.filePaths.length !== 1 && !chooser.canceled) {
      throw new Error("Load failed");
    }
  } catch (err) {
    dialog.showErrorBox("Load Failed", "Selected file could not be opened.");
    win.webContents.send("load", { status: 500, msg: "Error: Load Failed" });
  }
}

/**
 * Handles saving to existing file (`save`) and to a new file (`saveAs`)
 * For `saveAs`, the activeFile is set to the newly saved file
 *
 * @param {*} event
 * @param {*} data Data to save
 * @param {Boolean} saveAs Flag for `saveAs`
 */
async function doSave(event, data, saveAs = false) {
  let res = {};
  try {
    if (!activeFile || saveAs) {
      let chooser = await dialog.showSaveDialog(win, {
        defaultPath: "money-man-save.json",
        filters: [{ name: "JSON", extensions: ["json"] }],
        properties: [
          "showOverwriteConfirmation",
          "createDirectory",
          "dontAddToRecent",
        ],
      });

      let filename = "";
      if (chooser.filePath && !chooser.canceled) {
        activeFile = chooser.filePath;
        save(data.transactions, activeFile);
        filename = getBasename(activeFile);
        updateTitle(filename);
        res = {
          status: 200,
          msg: "Save Successful",
          filename,
        };
      } else if (chooser.canceled) {
        res = { status: 200, msg: "Save Canceled" };
      } else {
        throw new Error("Save Failed");
      }
    } else {
      save(data.transactions, path.join(activeFile));
      filename = getBasename(activeFile);
      updateTitle(filename);
      res = {
        status: 200,
        msg: "Save Successful",
        filename,
      };
    }
  } catch (err) {
    res = { status: 500, msg: "Error: Save Failed" };
  } finally {
    win.webContents.send("save", res);
  }
}

ipcMain.on("load", doLoad);
ipcMain.on("save", doSave);
ipcMain.on("saveAs", (e, args) => {
  doSave(e, args, true);
});

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
            dialog.showMessageBox(win, {
              message: "Sorry! This feature has not been implemented yet",
            });
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
            if (activeFile) {
              win.webContents.send("reqSave");
            } else {
              win.webContents.send("reqSaveAs");
            }
          },
        },
        {
          label: "Save As...",
          accelerator:
            process.platform === "darwin" ? "Cmd+Shift+s" : "Ctrl+Shift+s",
          click: () => {
            win.webContents.send("reqSaveAs");
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

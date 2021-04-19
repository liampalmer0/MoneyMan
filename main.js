const { app, BrowserWindow, ipcMain, Menu } = require("electron");
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

const isMac = process.platform === "darwin";

const template = [
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
        click: () => {
          console.log("Clicked menu open");
        },
      },
      { type: "separator" },
      {
        label: "Save",
        accelerator: process.platform === "darwin" ? "Cmd+s" : "Ctrl+s",
        click: () => {
          console.log("Clicked menu save");
        },
      },
      { type: "separator" },
      isMac ? { role: "close" } : { role: "quit" },
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
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

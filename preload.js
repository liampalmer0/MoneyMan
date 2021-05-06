const { contextBridge, ipcRenderer } = require("electron");

// whitelisted channels
const CHANNELS = ["new", "save", "load", "reqSave"];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    if (CHANNELS.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    if (CHANNELS.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});

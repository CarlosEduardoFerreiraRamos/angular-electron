"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require("fs");
var win;
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/angular-electron/index.html"),
        protocol: 'file:',
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on('close', function () {
        win = null;
    });
}
electron_1.ipcMain.on('showFile', function (event, arg) {
    electron_1.shell.showItemInFolder(__dirname);
});
electron_1.ipcMain.on('loadFile', function (event, arg) {
    electron_1.dialog.showOpenDialog({}, function (fileNames, bookMark) {
        console.log('showOpenDialog', fileNames, bookMark);
    });
});
electron_1.ipcMain.on('saveFile', function (event, arg) {
    electron_1.dialog.showSaveDialog({}, function (fileName, bookMark) {
        console.log('showSaveDialog arg', arg);
        console.log('showSaveDialog', fileName, bookMark);
    });
});
electron_1.ipcMain.on('getFiles', function (event, arg) {
    console.log(arg);
    console.log(__dirname);
    var files = fs.readdirSync(__dirname);
    win.webContents.send('getFilesResponse', files);
});
//# sourceMappingURL=main.js.map
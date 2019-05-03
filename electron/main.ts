import { app, BrowserWindow, ipcMain, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true }
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
            protocol: 'file:',
            slashes: true
        })
    );

    win.webContents.openDevTools();

    win.on('close', () => {
        win = null;
    });
}

ipcMain.on('showFile', (event, arg) => {
    shell.showItemInFolder(__dirname);
});

ipcMain.on('getFiles', (event, arg) => {
    console.log(arg)
    console.log(__dirname)
    const files = fs.readdirSync(__dirname);
    win.webContents.send('getFilesResponse', files);
});
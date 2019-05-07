import { app, BrowserWindow, ipcMain, shell, dialog, OpenDialogOptions } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import * as https from 'https';

let win: BrowserWindow;

const dialogOptions: OpenDialogOptions =  {
    defaultPath: app.getPath('desktop')
};

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

function saveImageToDisk(imageUrl: string, localPath: string) {
    const fileObject: fs.WriteStream = fs.createWriteStream(localPath);
    https.get(imageUrl, function(response) {
        response.pipe(fileObject);
    });
}

function getFolderPath([ firstpath ]: string[]) {
    const arr  = firstpath.split('/');
    arr.pop();
    return arr.join('/').concat('/');
}

ipcMain.on('showFile', (event, arg) => {
    shell.showItemInFolder(__dirname);
});

ipcMain.on('loadFile', (event, arg) => {
    dialog.showOpenDialog(dialogOptions, ([fileName]: string[], bookMark: string[]) => {
        console.log('showOpenDialog', fileName, bookMark);
        dialogOptions.defaultPath = path.dirname(fileName);
    });
});

ipcMain.on('saveFile', (event, {value}) => {
    dialog.showSaveDialog(dialogOptions, (fileName: string, bookMark: string) => {
        console.log('showSaveDialog arg', value);
        console.log('showSaveDialog', fileName, bookMark);
        saveImageToDisk(value, fileName);
    });
});

ipcMain.on('getFiles', (event, arg) => {
    console.log(arg);
    console.log(__dirname);
    const files = fs.readdirSync(__dirname);
    win.webContents.send('getFilesResponse', files);
});

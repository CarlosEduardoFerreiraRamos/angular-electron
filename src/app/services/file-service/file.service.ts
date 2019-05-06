import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable } from 'rxjs';

@Injectable()
export class FileService {

  private ipc: IpcRenderer;

  constructor() {
    this.loadIcp();
  }

  loadIcp() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }

  showFiles() {
    this.ipc.send('showFile');
  }

  loadFile(): Observable<any> {
    return new Observable( (subs) => {
      this.ipc.once('loadFileResponse', (event, args) => {
        subs.next(args);
        subs.complete();
      });
      this.ipc.send('loadFile', {value: 'value'});
    });
  }

  saveFile(value?): Observable<any> {
    return new Observable( (subs) => {
      this.ipc.once('saveFileResponse', (event, args) => {
        subs.next(args);
        subs.complete();
      });
      this.ipc.send('saveFile', { value });
    });
  }

  getFiles(): Observable<any> {
    return new Observable( (subs) => {
      this.ipc.once('getFilesResponse', (event, args) => {
        subs.next(args);
        subs.complete();
      });
      this.ipc.send('getFiles');
    });
  }
}

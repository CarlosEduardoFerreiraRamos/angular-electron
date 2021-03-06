import { Component } from '@angular/core';
import { FileService } from './services/file-service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-electron';

  text = '';

  imageUrl = ''

  constructor(private _fileService: FileService) {
  }

  onReadFiles() {
    this._fileService.getFiles().subscribe( res => console.log('in app component', res));
  }

  onShowFiles() {
    this._fileService.showFiles();
  }

  onLoadFiles() {
    this._fileService.loadFile().subscribe( res => console.log('Load File in app component', res));
  }

  onSaveFiles(value: string) {
    this._fileService.saveFile(value).subscribe( res => console.log('Save File in app component', res));
  }
}

import { Component } from '@angular/core';
import { FileService } from './services/file-service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-electron';

  constructor(private _fileService: FileService) {
  }

  onReadFiles() {
    this._fileService.getFiles().subscribe( res => console.log('in app component', res));
  }

  onShowFiles() {
    this._fileService.showFiles();
  }
}

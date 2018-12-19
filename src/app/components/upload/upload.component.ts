import { UploadImagesService } from './../../services/upload-images.service';
import { FileItem } from './../../models/file-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isOverElement: boolean = false;
  archives: FileItem[] = [];
  
  constructor(public uploadImagesService: UploadImagesService) { }

  ngOnInit() {
  }

  uploadImages() {
    this.uploadImagesService.uploadImagesToFireBase(this.archives);
  }

  testOverElement(event: boolean) {
    console.log(event);
  }

}

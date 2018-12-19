import { FileItem } from './../models/file-item';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import  * as firebase  from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  private imagesFolder = 'images';

  constructor(private db: AngularFirestore) { }

  private saveImages(image: {name: string, url: string}) {
    this.db.collection(`/${this.imagesFolder}`).add(image);
  }

  uploadImagesToFireBase(images: FileItem[]) {
    console.log(images);
  }
}

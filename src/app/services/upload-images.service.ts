import { FileItem } from './../models/file-item';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import  * as firebase  from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  private imagesFolder = 'images';

  constructor(private db: AngularFirestore) { }

  private saveImageDB(image: {name: string, url: string}) {
    this.db.collection(`/${this.imagesFolder}`).add(image);
  }

  uploadImagesToFireBase(images: FileItem[]) {
    //console.log(images);
    const storageRef = firebase.storage().ref();
    for (const item of images) {
      if (item.progress >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.imagesFolder}/${item.archiveName}`)
                                                                .put(item.myArchive);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('can not upload', error),
        () => {
          console.log('Upload Successfully!!!');
          const urlPromise = uploadTask.snapshot.ref.getDownloadURL();
          urlPromise.then(url => {
            item.url = url;
            item.isUploading = false;
            this.saveImageDB({ name : item.archiveName, url: item.url });
          });
        });                                                                
    }
  }
}

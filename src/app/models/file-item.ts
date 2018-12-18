export class FileItem {
  public myArchive: File;
  public archiveName: string;
  public url: string;
  public isUploading: boolean;
  public progress: number;

  constructor(archive: File) {
    this.myArchive = archive;
    this.archiveName = archive.name;
    this.isUploading = false;
    this.progress = 0;
  }
}
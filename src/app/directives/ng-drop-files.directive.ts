import { FileItem } from './../models/file-item';
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archives: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any){
    this.mouseOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any){
    this.mouseOver.emit(false);
  }
  /**validations */
  private canArchiveBeDropped(archive: File) {
    if (!this.archiveAlreadyDropped(archive.name) && this.isImage(archive.type)) {
      return true;  
    } else {
      return false;
    }
  }
  private preventAndStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  private archiveAlreadyDropped(archiveName: string): boolean {
    for (const archive of this.archives) {
      if (archive.archiveName === archiveName) {
        return true;
      }
    }
    return false;
  }
  private isImage(archiveType: string) {
    return (archiveType === '' || archiveType === undefined) ? false : archiveType.startsWith('image'); 
  }
}

import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'fileUpload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.less']
})
export class FileUploadComponent {
  @Input()
  mode
  @Input()
  names
  @Input()
  url
  @Input()
  method
  @Input()
  multiple
  @Input()
  disabled
  @Input()
  accept
  @Input()
  maxFileSize
  @Input()
  auto = true
  @Input()
  withCredentials
  @Input()
  invalidFileSizeMessageSummary
  @Input()
  invalidFileSizeMessageDetail
  @Input()
  invalidFileTypeMessageSummary
  @Input()
  invalidFileTypeMessageDetail
  @Input()
  previewWidth
  @Input()
  chooseLabel = 'Choose'
  @Input()
  uploadLabel = 'Upload'
  @Input()
  cancelLabel = 'Cance'
  @Input()
  customUpload
  @Input()
  showUploadButton
  @Input()
  showCancelButton


  @Input()
  dataUriPrefix
  @Input()
  deleteButtonLabel
  @Input()
  deleteButtonIcon = 'close'
  @Input()
  showUploadInfo

  /**
   *
   */


  @ViewChild('fileUpload')
  fileUpload: ElementRef

  inputFileName: string

  @Input()
  files: File[] = []

  @Input()
  draggable: boolean=true;

  @Output() onFileChange : EventEmitter<any> = new EventEmitter<any>();
  selectedFileName: any;
  constructor(private sanitizer: DomSanitizer) {

  }

  onClick(event) {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onInput(event) {

  }

  onFileSelected(event) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    console.log('event::::::', event)
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (this.validate(file)) {
        this.selectedFileName = file.name;
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            file.base64String = reader.result;
        };
        if (!this.isMultiple()) {
          this.files = []
        }
        this.files.push(files[i]);

      }
    }
    console.log(this.files);
    this.onFileChange.emit(this.files);
  }

  removeFile(fileName) {
    this.selectedFileName = null;
    let ix = this.files.findIndex(file => file.name === fileName);
    if (ix !== -1) {
        this.files.splice(ix, 1);
        this.clearInputElement();
        this.onFileChange.emit(this.files);
    }
}

  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
  }


  isMultiple(): boolean {
    return this.multiple
  }

}

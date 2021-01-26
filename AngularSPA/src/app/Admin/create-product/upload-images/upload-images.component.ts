import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {


  @Input() photos: Photo[];

  @Input() productId: string;

  @Output() updatePorgress = new EventEmitter();
  @Output() imageToPass: EventEmitter<any> = new EventEmitter();
 

  imagesToUpload: File[] = [];
  selectedFiles: any[] = [];


  toUplaod = 0;

  constructor(private photoService: PhotoService, private productSerice: ProductService) { }

  ngOnInit() {
  }
  onFileSelected(event, imageInput) {


    this.toUplaod = 8 - this.selectedFiles.length

    if (this.selectedFiles.length > 7) return;
    let files = event.target.files
    if (event.target.files.length <= this.toUplaod) {

      for (let i = 0; i < files.length; i++) {

        /*  var bytessize = files[i].size;
         var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
         if (bytessize == 0)
           var convertedsize = '0 Byte';
         var e = Math.floor(Math.log(bytessize) / Math.log(1024));
         convertedsize = Math.round(bytessize / Math.pow(1024, e)) + ' ' + sizes[e]; */

        //console.log(this.imagesToUpload);


        const file: File = imageInput.files[i];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {

          this.selectedFiles.push({ src: event.target.result, file });
          this.selectedFiles.forEach(file => {
            file.uploadedPercent = 0;
          })
        });
        this.imagesToUpload.push(files[i]);

        reader.readAsDataURL(file);

      }
    }
  }


  onUpload() {
    this.imagesToUpload.forEach(image => {

      this.photoService.uploder(image, this.productId).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.selectedFiles.forEach(file => {

            file.uploadedPercent = Math.round((100 * event.loaded) / event.total);
          })
          this.imageToPass.emit(this.selectedFiles[0]);
        } else if (event.type == HttpEventType.Response) {

          // this.photos.push(event.body.valueOf() as Photo);
          /* if (this.photos[0].isMain) { */
          /*   this.productSerice.updatePhoto(this.photos[0].url)
            this.productSerice.currentProduct.photoUrl = this.photos[0].url;
            localStorage.setItem('product', JSON.stringify(this.productSerice.currentProduct)) */
          /*  console.log(this.photos[0]); */


        }
      }, err => {
        console.log(err);
      }, () => {
        this.updatePorgress.emit(false);
      })
    })
  }
  clearPhotos() {
    this.imagesToUpload = [];
    this.selectedFiles = [];
  }
}

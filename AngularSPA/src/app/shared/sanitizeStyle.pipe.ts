import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Order } from '../models/order';

@Pipe({
  name: 'sanitizeStyle'
})
export class sanitizeStylePipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(v: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle(v);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploder(image: File, productId: string) {
    const fromData = new FormData();

    fromData.append('File', image, image.name);

    return this.http.post(`${this.baseUrl}products/${productId}/photo`, fromData, {
      reportProgress: true,
      observe: "events"
    })

  }
}

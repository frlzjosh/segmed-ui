import { Injectable } from '@angular/core';
import { Pictures } from './interfaces/Pictures';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment } from './../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private host: string = environment.API_HOST

  constructor(private http:HttpClient) { }

  getAllPictures(): Observable<Pictures[]>{
    const url = `${this.host}/get/all`
    return this.http.get<Pictures[]>(url);
  }

  flagPicture(pictureID: number){
    const url = `${this.host}/flag/${pictureID}`
    return this.http.get(url)
  }

}

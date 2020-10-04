import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { PictureService } from '../picture.service';
import { Pictures } from './../interfaces/Pictures'
import { async, delay } from 'q';
import { PicturesUpdated } from '../interfaces/PicturesUpdated';


@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit, AfterContentChecked{

  public pictures: PicturesUpdated[] = []
  public flaggedPhoto;

  constructor(private pictureService: PictureService) { }


  ngOnInit(): void {
    this.getPhotos()
  }
  
  ngAfterContentChecked(){
    this.sortPhotos()
  }

  flagPhoto(pictureID: number){
    this.pictureService.flagPicture(pictureID).subscribe()
    this.pictures.map((el, index, arr)=>{
      if(el.ID == pictureID){
        el.is_flagged = !el.is_flagged
        if(el.is_flagged == false){
          el.ui_flagged = 'Not Flagged'
        }else{
          el.ui_flagged = 'Flagged'
        }
      }
    })
  }

  sortPhotos(){
    if(this.pictures.length > 0){
      this.pictures.sort((a,b) => b.custom_time_decimal - a.custom_time_decimal)
    }
  }

  
  getPhotos() {
    this.pictureService.getAllPictures()
    .subscribe((pictures: Pictures[])=>{
      pictures.map((picture: Pictures) =>{
          let date = new Date(picture.custom_time).getTime()
          console.log('date: ', date)
          let pictureUpdated: PicturesUpdated = {
            ID: picture.ID,
            CreatedAt: picture.CreatedAt,
            UpdatedAt: picture.UpdatedAt,
            DeletedAt: picture.DeletedAt,
            picture_url: picture.picture_url,
            is_flagged: picture.is_flagged,
            custom_time: picture.custom_time,
            metadata: picture.metadata,
            custom_time_decimal: date,
            ui_flagged: ''
          }
          if(pictureUpdated.is_flagged == false){
            pictureUpdated.ui_flagged = 'Not Flagged'
          }else{
            pictureUpdated.ui_flagged = 'Flagged'
          }
          this.pictures.push(pictureUpdated)
        })
      }
    )
  }

}

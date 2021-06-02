import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sticker } from '../interface/sticker.interface';
import { StickerType } from '../interface/type.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpStickerService {

  constructor(private http: HttpClient) { }
  stickerRoute = "http://localhost:3000/stickers/"
  typeRoute = "http://localhost:3000/types/"
  getStickers(): Promise<any>{
    return this.http.get(this.stickerRoute).toPromise()
  }
  postSticker(data:Sticker){
    return this.http.post(this.stickerRoute,data).toPromise()
  }
  deleteSticker(id:number){
    return this.http.delete(this.stickerRoute+id).toPromise()
  }
  editSticker(data:Sticker){
    return this.http.patch(this.stickerRoute+data.id,data).toPromise()
  }
  getStickerTypes(): Promise<any>{
    return this.http.get(this.typeRoute).toPromise()
  }
  getStickerType(id:number): Promise<any>{
    return this.http.get(this.typeRoute+id).toPromise()
  }
  postStickerType(data:StickerType){
    return this.http.post(this.typeRoute,data).toPromise()
  }
  deleteStickerType(id:number){
    return this.http.delete(this.typeRoute+id).toPromise()
  }
  editStickerType(data:StickerType){
    return this.http.patch(this.typeRoute+data.id,data).toPromise()
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  Sticker
} from './shared/interface/sticker.interface';
import { StickerType } from './shared/interface/type.interface';
import { HttpStickerService } from './shared/services/http-sticker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project15';
  idCounter = 0
  stickers: Sticker[] = []
  stickerTypes: StickerType[] = []
  constructor(private httpServ:HttpStickerService){}
  async getType(id:number){
    let type
    try{
      if(id!=null)type = await this.httpServ.getStickerType(id)
    }catch(err){
      console.log(err);
    }finally{
      if(type==undefined) type = ""
    }
  }
  async getStickers(){
    try{
      this.stickers = await this.httpServ.getStickers()
    }catch(err){
      console.log(err);
      
    }finally{
      this.stickers.sort((a,b)=>{
        return a.id-b.id      
      })
      if(this.stickers.length>0){
        this.idCounter = this.stickers[this.stickers.length-1].id
      }else
      {
        this.idCounter = 0
      }
      this.stickers.forEach(el=>{
        this.httpServ.getStickerType(el.type).then(res=>el.type = res.name)
      })
    }
  }
  async createSticker(sticker:Sticker){
    try{
      this.getStickers()
      sticker.id = ++this.idCounter
      await this.httpServ.postSticker(sticker)
    }catch(err){
      console.log(err);
      
    }finally{
      this.getStickers()
    }
  }
  async deleteSticker(id:number){
    try{
      await this.httpServ.deleteSticker(id)
    }catch(err){
      console.log(err);
      
    }finally{
      this.getStickers()
    }
  }
  async editSticker(sticker:Sticker){
    try{
      await this.httpServ.editSticker(sticker)    
    }catch(err){
      console.log(err);
    }finally{
      this.getStickers()
    }
  }
  // cloneArr(arr:any[]) {
  //   let semiArr:any = []
  //   for (let i = 0; i < arr.length; i++) {
  //     if (Array.isArray(arr[i])) {
  //       semiArr[i] = this.cloneArr(arr[i])
  //     } else {
  //       semiArr[i] = arr[i]
  //     }
  //   }
  //   return semiArr
  // }
  async getTypes(){
    try{
      this.stickerTypes = await this.httpServ.getStickerTypes()
      // this.stickerTypes = this.cloneArr(await this.httpServ.getStickerTypes())
      console.log(this.stickerTypes);
      
    }catch(err){
      console.log(err);
    }
    
  }
  async typeEdit(){
    await this.getTypes()
    this.getStickers()    
  }
  ngOnInit(){
    this.getStickers()
    this.getTypes()
  }
}

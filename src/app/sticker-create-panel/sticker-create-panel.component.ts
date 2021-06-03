import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Sticker
} from '../shared/interface/sticker.interface';
import { StickerType } from '../shared/interface/type.interface';

@Component({
  selector: 'app-sticker-create-panel',
  templateUrl: './sticker-create-panel.component.html',
  styleUrls: ['./sticker-create-panel.component.css']
})
export class StickerCreatePanelComponent implements OnInit {
  stickerForm!:FormGroup
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controls = {
      title: [null,[Validators.required,Validators.maxLength(30)]],
      text: [null,[Validators.required,Validators.maxLength(100)]],
      type: [0,[Validators.maxLength(15)]]
    }
    this.stickerForm = this.fb.group(controls)  
  }
  
  date: any
  @Input() stickerTypes!: StickerType[]
  @Output() stickerCreated = new EventEmitter < Sticker > ();
  addNote() {
    let sticker = this.stickerForm.value 
    sticker.type = parseInt( sticker.type)
    console.log(this.stickerForm.value );
    
    let buf = sticker.title.split("")
    if (buf.length != 0) {
      buf[0] = buf[0].toUpperCase()
      sticker.title = buf.join("")
    }
    sticker.date = Date.now();
    sticker.lastEdited= Date.now();
    this.stickerCreated.emit(sticker);
    this.stickerForm.reset()
    this.stickerForm.get('type')?.setValue(0)
  }
}

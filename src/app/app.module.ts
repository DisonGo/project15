import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StickerComponent } from './sticker/sticker.component';
import { StickerCreatePanelComponent } from './sticker-create-panel/sticker-create-panel.component';
import { StickerTypeControlPanelComponent } from './sticker-type-control-panel/sticker-type-control-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    StickerComponent,
    StickerCreatePanelComponent,
    StickerTypeControlPanelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

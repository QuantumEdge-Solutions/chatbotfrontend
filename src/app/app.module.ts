import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatWidgetComponent} from "./chat-widget/chat-widget.component";
import { ChabotDemoComponent } from './chabot-demo/chabot-demo.component';
import { ChabotFullpageComponent } from './chabot-fullpage/chabot-fullpage.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ChabotDemoComponent,
    ChabotFullpageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ChatWidgetComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

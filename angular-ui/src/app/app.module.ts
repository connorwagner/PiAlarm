import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlarmManagerComponent } from './components/alarm-manager/alarm-manager.component';
import { LedManagerComponent } from './components/led-manager/led-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    AlarmManagerComponent,
    LedManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

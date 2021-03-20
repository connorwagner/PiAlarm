import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlarmManagerComponent } from './components/alarm-manager/alarm-manager.component';
import { LedManagerComponent } from './components/led-manager/led-manager.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';

@NgModule({
  declarations: [
    AppComponent,
    AlarmManagerComponent,
    LedManagerComponent,
    NavigationHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

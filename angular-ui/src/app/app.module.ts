import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlarmManagerComponent } from './components/alarm-manager/alarm-manager.component';
import { LedManagerComponent } from './components/led-manager/led-manager.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AddAlarmComponent } from './components/alarm-manager/add-alarm/add-alarm.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AlarmManagerComponent,
    LedManagerComponent,
    NavigationHeaderComponent,
    AddAlarmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

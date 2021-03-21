import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlarmComponent } from './components/alarm-manager/add-alarm/add-alarm.component';
import { AlarmManagerComponent } from './components/alarm-manager/alarm-manager.component';
import { LedManagerComponent } from './components/led-manager/led-manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'alarm-manager',
    pathMatch: 'full'
  },
  {
    path: 'alarm-manager',
    component: AlarmManagerComponent,
    pathMatch: 'full'
  },
  {
    path: 'alarm-manager/add-alarm',
    component: AddAlarmComponent,
    pathMatch: 'full'
  },
  {
    path: 'led-manager',
    component: LedManagerComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';
import { AlarmService } from 'src/app/services/alarm.service';

@Component({
  selector: 'app-alarm-manager',
  templateUrl: './alarm-manager.component.html',
  styleUrls: ['./alarm-manager.component.scss']
})
export class AlarmManagerComponent implements OnInit {

  public readonly alarms$ = this.alarmService.getAlarms();

  constructor(private alarmService: AlarmService) { }

  ngOnInit(): void { }

  public readonly formatTimeString = (hour: number, minute: number): string => {
    const padString = (s: string): string => s.length < 2 ? `0${s}` : s;
    const isPm = hour >= 12;
    if (isPm) hour -= 12;
    if (hour == 0) hour = 12;
    return `${hour}:${padString(minute.toString())} ${isPm ? 'PM' : 'AM'}`;
  }

}

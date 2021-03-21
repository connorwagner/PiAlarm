import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, merge } from 'rxjs/operators';
import { Alarm } from 'src/app/models/alarm';
import { AlarmService } from 'src/app/services/alarm.service';

@Component({
  selector: 'app-alarm-manager',
  templateUrl: './alarm-manager.component.html',
  styleUrls: ['./alarm-manager.component.scss']
})
export class AlarmManagerComponent implements OnInit {
  private readonly _alarms$ = new Subject<Alarm[]>();

  public readonly alarms$ = this.alarmService.getAlarms().pipe(merge(this._alarms$.asObservable()));
  public expandedActionsIndex: number = -1;

  constructor(private alarmService: AlarmService) { }

  ngOnInit(): void { }

  public readonly toggleActive = (alarm: Alarm): void => {
    this.alarmService
      .toggleAlarmActive(alarm)
      .pipe(
        take(1))
      .subscribe(this.updateAlarms);
  }

  public readonly deleteAlarm = (alarm: Alarm): void => {
    this.menuActionClicked();

    this.alarmService
      .deleteAlarm(alarm)
      .pipe(
        take(1))
      .subscribe(this.updateAlarms);
  }

  private readonly menuActionClicked = (): void => {
    this.expandedActionsIndex = -1;
  }

  private readonly updateAlarms = (): void => {
    this.alarmService
      .getAlarms()
      .pipe(
        take(1))
      .subscribe(alarms => this._alarms$.next(alarms));
  }

  public readonly formatTimeString = (hour: number, minute: number): string => {
    const padString = (s: string): string => s.length < 2 ? `0${s}` : s;
    const isPm = hour >= 12;
    if (isPm) hour -= 12;
    if (hour == 0) hour = 12;
    return `${hour}:${padString(minute.toString())} ${isPm ? 'PM' : 'AM'}`;
  }

  public readonly showActionsForRow = (index: number): void => {
    this.expandedActionsIndex = this.expandedActionsIndex === index ? -1 : index;
  }
}

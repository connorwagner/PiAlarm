import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Alarm } from 'src/app/models/alarm';
import { allDays, Day } from 'src/app/models/day';
import { AlarmService } from 'src/app/services/alarm.service';

@Component({
  selector: 'app-add-alarm',
  templateUrl: './add-alarm.component.html',
  styleUrls: ['./add-alarm.component.scss']
})
export class AddAlarmComponent implements OnInit {
  public form = new FormGroup({
    time: new FormControl(),
    days: new FormControl()
  });
  public readonly days: Day[] = allDays;

  constructor(private alarmService: AlarmService, private router: Router) { }

  ngOnInit(): void { }

  public readonly submit = (): void => {
    const timeComponents = this.form.value.time.split(':');
    const alarm: Alarm = {
      id: 0,
      days: this.form.value.days,
      hour: timeComponents[0],
      minute: timeComponents[1],
      active: true
    };
    this.alarmService.createAlarm(alarm).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/alarm-manager']);
    });
  }
}

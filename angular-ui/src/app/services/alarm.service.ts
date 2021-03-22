import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Alarm } from '../models/alarm';
import { allDays, Day } from '../models/day';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public readonly getAlarms = (): Observable<Alarm[]> =>
    this.httpClient
      .get<AlarmResponse[]>(`${this.apiBaseUrl}/alarms`)
      .pipe(
        map<AlarmResponse[], Alarm[]>(mapAlarm));

  public readonly toggleAlarmActive = (alarm: Alarm): Observable<void> =>
    this.httpClient
      .put(
        `${this.apiBaseUrl}/alarms/${alarm.id}`,
        {},
        { responseType: 'text' })
      .pipe(
        map(() => { }));

  public readonly deleteAlarm = (alarm: Alarm): Observable<void> =>
    this.httpClient
      .delete(
        `${this.apiBaseUrl}/alarms/${alarm.id}`,
        { responseType: 'text' })
      .pipe(
        map(() => { }));

  public readonly createAlarm = (alarm: Alarm): Observable<void> =>
    this.httpClient
      .post(
        `${this.apiBaseUrl}/alarms`,
        {
          days: alarm.days.map(day => day.letter).reduce((acc, cur) => `${acc}${cur}`),
          hour: alarm.hour,
          minute: alarm.minute
        },
        { responseType: 'text' })
      .pipe(
        map(() => { }));

  public readonly stopAlarm = (): Observable<void> =>
    this.httpClient
      .delete(
        `${this.apiBaseUrl}/speaker`,
        { responseType: 'text' })
      .pipe(
        map(() => { }));
}

const mapAlarm = (responseArray: AlarmResponse[]): Alarm[] =>
  responseArray.map(alarmResponse => ({
    id: alarmResponse.ID,
    days: mapDays(alarmResponse.Days),
    hour: alarmResponse.Hour,
    minute: alarmResponse.Minute,
    active: alarmResponse.Active == 1
  }));

const mapDays = (days: string): Day[] =>
  days
    .split('')
    .map(char =>
      allDays.find(day => day.letter === char.toUpperCase())!);

interface AlarmResponse {
  ID: number;
  Days: string;
  Hour: number;
  Minute: number;
  Active: number;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Alarm } from '../models/alarm';
import { Day } from '../models/day';

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
      .put(`${this.apiBaseUrl}/alarms/${alarm.id}`, {}, { responseType: 'text' })
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
      dayLookup.find(day => day.letter === char.toUpperCase())!);

const dayLookup: Day[] = [
  { name: 'Monday', letter: 'M' },
  { name: 'Tuesday', letter: 'T' },
  { name: 'Wednesday', letter: 'W' },
  { name: 'Thursday', letter: 'R' },
  { name: 'Friday', letter: 'F' },
  { name: 'Saturday', letter: 'S' },
  { name: 'Sunday', letter: 'U' },
];

interface AlarmResponse {
  ID: number;
  Days: string;
  Hour: number;
  Minute: number;
  Active: number;
}

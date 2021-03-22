import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Led, Leds, mapLedsFromObject, mapLedsToObject } from '../models/led';

@Injectable({
  providedIn: 'root'
})
export class LedService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public readonly getLeds = (): Observable<Led[]> =>
    this.httpClient
      .get<Leds>(`${this.apiBaseUrl}/leds`)
      .pipe(
        map<Leds, Led[]>(mapLedsFromObject));

  public readonly updateLeds = (leds: Led[]): Observable<void> =>
    this.httpClient
      .put(
        `${this.apiBaseUrl}/leds`,
        mapLedsToObject(leds),
        { responseType: 'text' })
      .pipe(
        map(() => { }));
}

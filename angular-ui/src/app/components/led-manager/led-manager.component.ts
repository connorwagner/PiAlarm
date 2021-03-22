import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Led, mapLedsFromObject, mapLedsToObject } from 'src/app/models/led';
import { LedService } from 'src/app/services/led.service';

@Component({
  selector: 'app-led-manager',
  templateUrl: './led-manager.component.html',
  styleUrls: ['./led-manager.component.scss']
})
export class LedManagerComponent implements OnInit {
  public form = new FormGroup({
    red: new FormControl(0),
    green: new FormControl(0),
    blue: new FormControl(0),
    white: new FormControl(0),
  })

  constructor(private ledService: LedService) { }

  ngOnInit(): void {
    this.updateLeds();
  }

  private readonly updateLeds = (): void => {
    this.ledService
      .getLeds()
      .pipe(
        take(1))
      .subscribe(leds =>
        this.form.setValue(
          mapLedsToObject(leds)));
  }

  public readonly submit = (): void => {
    this.ledService
      .updateLeds(
        mapLedsFromObject(this.form.value))
      .pipe(
        take(1))
      .subscribe(() => this.updateLeds());
  }
}

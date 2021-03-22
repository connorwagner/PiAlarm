import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlarmComponent } from './add-alarm.component';

describe('AddAlarmComponent', () => {
  let component: AddAlarmComponent;
  let fixture: ComponentFixture<AddAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmManagerComponent } from './alarm-manager.component';

describe('AlarmManagerComponent', () => {
  let component: AlarmManagerComponent;
  let fixture: ComponentFixture<AlarmManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

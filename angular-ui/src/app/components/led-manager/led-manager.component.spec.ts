import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedManagerComponent } from './led-manager.component';

describe('LedManagerComponent', () => {
  let component: LedManagerComponent;
  let fixture: ComponentFixture<LedManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

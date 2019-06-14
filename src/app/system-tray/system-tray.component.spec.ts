import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTrayComponent } from './system-tray.component';

describe('SystemTrayComponent', () => {
  let component: SystemTrayComponent;
  let fixture: ComponentFixture<SystemTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

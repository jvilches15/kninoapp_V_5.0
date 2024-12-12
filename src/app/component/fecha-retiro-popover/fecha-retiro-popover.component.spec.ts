import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FechaRetiroPopoverComponent } from './fecha-retiro-popover.component';

describe('FechaRetiroPopoverComponent', () => {
  let component: FechaRetiroPopoverComponent;
  let fixture: ComponentFixture<FechaRetiroPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FechaRetiroPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FechaRetiroPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

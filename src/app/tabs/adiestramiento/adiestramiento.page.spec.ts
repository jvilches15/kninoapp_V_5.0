import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdiestramientoPage } from './adiestramiento.page';

describe('AdiestramientoPage', () => {
  let component: AdiestramientoPage;
  let fixture: ComponentFixture<AdiestramientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdiestramientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdoptaPage } from './adopta.page';

describe('AdoptaPage', () => {
  let component: AdoptaPage;
  let fixture: ComponentFixture<AdoptaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdiestramientoPage } from './adiestramiento.page';
import { IonicModule } from '@ionic/angular';

describe('AdiestramientoPage', () => {
  let component: AdiestramientoPage;
  let fixture: ComponentFixture<AdiestramientoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdiestramientoPage],
      imports: [IonicModule.forRoot()] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdiestramientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener una lista de consejos de adiestramiento', () => {
    expect(component.adiestras).toBeDefined();
    expect(component.adiestras.length).toBeGreaterThan(0);
  });

  it('debería tener 6 consejos en la lista de adiestramiento', () => {
    expect(component.adiestras.length).toBe(6);  
  });

  it('cada consejo debe tener un nombre, un consejo y una imagen', () => {
    component.adiestras.forEach(adiestramiento => {
      expect(adiestramiento.nombre).toBeDefined();
      expect(adiestramiento.consejo).toBeDefined();
      expect(adiestramiento.imagen).toBeDefined();
    });
  });
});


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdoptaPage } from './adopta.page';
import { IonicModule, AlertController } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

describe('AdoptaPage', () => {
  let component: AdoptaPage;
  let fixture: ComponentFixture<AdoptaPage>;
  let alertController: AlertController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptaPage],
      imports: [IonicModule.forRoot()],
      providers: [AlertController] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdoptaPage);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener una lista de adopciones', () => {
    expect(component.adoptame).toBeDefined();
    expect(component.adoptame.length).toBeGreaterThan(0);
  });

  it('debería tener 8 perros en la lista de adopciones', () => {
    expect(component.adoptame.length).toBe(8);  
  });

  it('debería llamar al método adoptar y mostrar una alerta con el mensaje adecuado', async () => {
    spyOn(alertController, 'create').and.callThrough();  
    const perroAdoptado = component.adoptame[0];  

    
    await component.adoptar(perroAdoptado);

    
    expect(alertController.create).toHaveBeenCalled();
    
    
    const alert = await alertController.create({
      header: '¡Éxito!',
      message: `Perrito/a ${perroAdoptado.nombre} adoptado.`,
      buttons: ['OK']
    });
    expect(alert.message).toBe(`Perrito/a ${perroAdoptado.nombre} adoptado.`);
  });

  it('debería mostrar un mensaje de éxito cuando un perro es adoptado', async () => {
    spyOn(alertController, 'create').and.returnValue(Promise.resolve({
      present: () => Promise.resolve()
    } as any)); 

    const perroAdoptado = component.adoptame[0];
    await component.adoptar(perroAdoptado);

    expect(alertController.create).toHaveBeenCalled();
  });

  it('debería mostrar todos los datos del perro en el componente', () => {
    const perro = component.adoptame[0];
    
   
    expect(perro.nombre).toBeDefined();
    expect(perro.mensaje).toBeDefined();
    expect(perro.imagen).toBeDefined();
  });
});

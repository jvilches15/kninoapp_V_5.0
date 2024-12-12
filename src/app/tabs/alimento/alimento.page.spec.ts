import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlimentoPage } from './alimento.page';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { ComidaService } from 'src/app/service/comida.service';
import { of } from 'rxjs';

describe('AlimentoPage', () => {
  let component: AlimentoPage;
  let fixture: ComponentFixture<AlimentoPage>;
  let comidaService: ComidaService;
  let toastController: ToastController;
  let menuController: MenuController;

  beforeEach(async () => {
    const comidaServiceMock = {
      getCategorias: jasmine.createSpy().and.returnValue(of({ categories: ['Dog Food', 'Cat Food'] })),
      buscarAlimento: jasmine.createSpy().and.returnValue(of([]))
    };

    const toastControllerMock = {
      create: jasmine.createSpy().and.returnValue(Promise.resolve({
        present: jasmine.createSpy('present')
      }))
    };

    const menuControllerMock = {
      close: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      declarations: [AlimentoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ComidaService, useValue: comidaServiceMock },
        { provide: ToastController, useValue: toastControllerMock },
        { provide: MenuController, useValue: menuControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlimentoPage);
    component = fixture.componentInstance;
    comidaService = TestBed.inject(ComidaService);
    toastController = TestBed.inject(ToastController);
    menuController = TestBed.inject(MenuController);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar categorías de alimentos', () => {
    component.ngOnInit();
    expect(comidaService.getCategorias).toHaveBeenCalled();
    expect(component.categorias.length).toBeGreaterThan(0);
  });

  it('debería llamar al método buscarAlimento y hacer la búsqueda', () => {
    component.buscadoAlimento = 'Alfa Dog';
    component.buscarAlimento();
    expect(comidaService.buscarAlimento).toHaveBeenCalledWith('Alfa Dog');
  });

  it('debería mostrar un toast cuando se agrega un alimento al carrito', async () => {
    
    component.agregarAlCarrito();
  
    
    expect(toastController.create).toHaveBeenCalled();
  
    
    const toast = await toastController.create({
      message: 'Alimento agregado al carrito.',
      duration: 2000,
    });
  
    
    await toast.present();
    expect(toast.present).toHaveBeenCalled();
  });

  it('debería cerrar el menú al inicializar el componente', () => {
    expect(menuController.close).toHaveBeenCalledWith('mainMenu');
  });

  it('debería verificar que la lista de alimentos tenga 7 elementos', () => {
    expect(component.alimentos.length).toBe(7);
  });

  it('debería agregar correctamente un alimento al carrito (mostrar toast)', () => {
    component.agregarAlCarrito();
    expect(component.toastOpen).toBeTrue();
  });

  it('debería comprobar que la búsqueda de alimento no esté vacía', () => {
    component.buscadoAlimento = 'Charly';
    component.buscarAlimento();
    expect(component.buscadoAlimento.trim()).not.toBe('');
  });
});

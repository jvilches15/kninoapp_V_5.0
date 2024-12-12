import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPage } from './registrar.page';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { KninodbService } from '../service/kninodb.service';
import { Geolocation } from '@capacitor/geolocation';
import { of, throwError } from 'rxjs';

describe('RegistrarPage', () => {
  let component: RegistrarPage;
  let fixture: ComponentFixture<RegistrarPage>;
  let kninodbServiceSpy: jasmine.SpyObj<KninodbService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    const spyKninodbService = jasmine.createSpyObj('KninodbService', ['insertUsuario', 'insertMascota', 'getUsuarioId']);
    const spyAlertController = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ RegistrarPage ],
      providers: [
        { provide: KninodbService, useValue: spyKninodbService },
        { provide: AlertController, useValue: spyAlertController },
        NavController,
        MenuController,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPage);
    component = fixture.componentInstance;

    kninodbServiceSpy = TestBed.inject(KninodbService) as jasmine.SpyObj<KninodbService>;
    alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;

    
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar una alerta si el formulario está incompleto', async () => {
    component.usuario = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      direccion: '',
      fechaNac: '',
    };
    await component.registrar();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Información de Registro',
      message: 'Error: Datos vacíos, debe completar todos los campos.',
      buttons: ['OK']
    });
  });

  it('debería mostrar una alerta si la contraseña no tiene exactamente 4 caracteres', async () => {
    component.usuario = {
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@example.com',
      password: '123',
      direccion: 'Dirección test',
      fechaNac: '01/01/2000',
    };
    await component.registrar();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Información de Registro',
      message: 'La contraseña debe ser de exactamente 4 caracteres.',
      buttons: ['OK']
    });
  });

  it('debería mostrar una alerta si la contraseña contiene caracteres no numéricos', async () => {
    component.usuario = {
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@example.com',
      password: 'abcd',
      direccion: 'Dirección test',
      fechaNac: '01/01/2000',
    };
    await component.registrar();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Información de Registro',
      message: 'La contraseña debe contener solo números.',
      buttons: ['OK']
    });
  });

  it('debería llamar a KninodbService.insertUsuario y KninodbService.insertMascota si los datos son válidos', async () => {
    component.usuario = {
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@example.com', 
      password: '1234',
      direccion: 'Dirección test',
      fechaNac: '01/01/2000',
    };
  
    component.mascota = {
      nombre: 'Fido',
      raza: 'Poodle',
      edad: '3',
      foto: undefined,
    };
  
    
    kninodbServiceSpy.insertUsuario.and.returnValue(Promise.resolve());
    kninodbServiceSpy.getUsuarioId.and.returnValue(Promise.resolve(1)); 
    kninodbServiceSpy.insertMascota.and.returnValue(Promise.resolve());
  
    await component.registrar();
  
    
    expect(kninodbServiceSpy.insertUsuario).toHaveBeenCalledWith(component.usuario);
    expect(kninodbServiceSpy.getUsuarioId).toHaveBeenCalledWith('juan@example.com'); 
    expect(kninodbServiceSpy.insertMascota).toHaveBeenCalledWith(component.mascota, 1);
  });
  

  it('debería limpiar los campos del formulario después de un registro exitoso', async () => {
    component.usuario = {
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@example.com',
      password: '1234',
      direccion: 'Dirección test',
      fechaNac: '01/01/2000',
    };

    component.mascota = {
      nombre: 'Fido',
      raza: 'Poodle',
      edad: '3',
      foto: undefined,
    };

    
    kninodbServiceSpy.insertUsuario.and.returnValue(Promise.resolve());
    kninodbServiceSpy.getUsuarioId.and.returnValue(Promise.resolve(1));
    kninodbServiceSpy.insertMascota.and.returnValue(Promise.resolve());

   
    await component.registrar();

    
    expect(component.usuario.nombre).toBe('');
    expect(component.mascota.nombre).toBe('');
  });
});

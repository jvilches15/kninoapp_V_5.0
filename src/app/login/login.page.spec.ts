import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { NavController, AlertController } from '@ionic/angular';
import { KninodbService } from '../service/kninodb.service';
import { UrlTree } from '@angular/router';

// Simulación de los servicios
class MockNavController {
  navigateForward(url: string | any[] | UrlTree, options?: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}

class MockAlertController {
  create() {
    return Promise.resolve({
      present: () => {},
    });
  }
}

class MockKninodbService {
  getUsuarioId(email: string): Promise<number> {
    return Promise.resolve(1);
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockNavController: MockNavController;
  let mockAlertController: MockAlertController;
  let mockKninodbService: MockKninodbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: NavController, useClass: MockNavController },
        { provide: AlertController, useClass: MockAlertController },
        { provide: KninodbService, useClass: MockKninodbService },
      ],
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    mockNavController = TestBed.inject(NavController);
    mockAlertController = TestBed.inject(AlertController);
    mockKninodbService = TestBed.inject(KninodbService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería validar correctamente el email', () => {
    expect(component.validarEmail('test@test.com')).toBeTrue();
    expect(component.validarEmail('emailinvalido')).toBeFalse();
  });

  it('debería mostrar una alerta cuando el correo está vacío', async () => {
    spyOn(component, 'Alerta');
    component.email = '';
    component.password = '1234';
    await component.login();
    expect(component.Alerta).toHaveBeenCalledWith('Debe ingresar un correo electrónico.');
  });

  it('debería mostrar una alerta cuando la contraseña está vacía', async () => {
    spyOn(component, 'Alerta');
    component.email = 'test@test.com';
    component.password = '';
    await component.login();
    expect(component.Alerta).toHaveBeenCalledWith('Debe ingresar una contraseña.');
  });

  it('debería mostrar una alerta cuando la contraseña tiene un formato incorrecto (no numérica)', async () => {
    spyOn(component, 'Alerta');
    component.email = 'test@test.com';
    component.password = 'abcd'; 
    await component.login();
    expect(component.Alerta).toHaveBeenCalledWith('La contraseña debe contener solo números.');
  });

  it('debería mostrar una alerta cuando la contraseña tiene menos de 4 o más de 4 caracteres', async () => {
    spyOn(component, 'Alerta');

    
    component.email = 'test@test.com';
    component.password = '123'; 
    await component.login();
    expect(component.Alerta).toHaveBeenCalledWith('La contraseña debe ser de exactamente 4 caracteres.');

    
    component.password = '12345'; 
    await component.login();
    expect(component.Alerta).toHaveBeenCalledWith('La contraseña debe ser de exactamente 4 caracteres.');
  });

  it('debería mostrar una alerta cuando la contraseña tiene 4 caracteres pero no es numérica', async () => {
    spyOn(component, 'Alerta');
    component.email = 'test@test.com';
    component.password = 'abcd'; 
    await component.login();
    expect(component.Alerta).toHaveBeenCalledWith('La contraseña debe contener solo números.');
  });

  it('debería navegar a home cuando el login es exitoso', async () => {
    spyOn(mockNavController, 'navigateForward');
    component.email = 'test@test.com';
    component.password = '1234'; 
    await component.login();
    expect(mockNavController.navigateForward).toHaveBeenCalledWith(['/home'], {
      queryParams: {
        email: 'test@test.com',
        password: '1234',
      },
    });
  });

  it('debería mostrar alerta cuando el usuario no está registrado', async () => {
    spyOn(component, 'Alerta');
    spyOn(mockKninodbService, 'getUsuarioId').and.throwError('Usuario no encontrado');
    component.email = 'test@test.com';
    component.password = '1234';
    await component.login();
    expect(component.Alerta).toHaveBeenCalledWith('Error: Usuario no registrado. Por favor regístrate primero.');
  });
});


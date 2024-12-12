import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicModule, ToastController, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { of } from 'rxjs';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  
  const activatedRouteMock = {
    queryParams: of({ email: 'test@example.com', password: 'password123' })
  };

 
  const toastSpy = jasmine.createSpyObj('ToastController', ['create']);
  const toastPresentSpy = jasmine.createSpyObj('Toast', ['present']);
  toastSpy.create.and.returnValue(Promise.resolve(toastPresentSpy));

  
  const cameraSpy = jasmine.createSpyObj('Camera', ['getPhoto']);
  const fakePhoto: Photo = {
    format: 'jpeg',
    dataUrl: 'data:image/jpeg;base64,fakeImageData',
    base64String: 'fakeBase64String',
    saved: true
  };

  
  cameraSpy.getPhoto.and.returnValue(Promise.resolve(fakePhoto));

  beforeEach(async () => {
    
    spyOn(localStorage, 'setItem');

   
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; 

    await TestBed.configureTestingModule({
      declarations: [HomePage],  
      imports: [
        IonicModule.forRoot(),
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }, 
        { provide: Camera, useValue: cameraSpy }, 
        { provide: ToastController, useValue: toastSpy }, 
        MenuController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  

  it('debería canjear un premio y mostrar un toast', async () => {
    const premioNombre = 'Burguer';
    await component.canjearLenguetazos(premioNombre);

   
    expect(toastSpy.create).toHaveBeenCalledWith({
      message: `${premioNombre} canjeado correctamente!`,
      duration: 2000,
      position: 'bottom'
    });

    const toastInstance = await toastSpy.create();
    expect(toastInstance.present).toHaveBeenCalled();
  });
});


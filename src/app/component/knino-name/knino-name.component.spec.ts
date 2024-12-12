import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KninoNameComponent } from './knino-name.component'; 
import { By } from '@angular/platform-browser';

describe('KninoNameComponent', () => {
  let component: KninoNameComponent;
  let fixture: ComponentFixture<KninoNameComponent>;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KninoNameComponent], 
    }).compileComponents();  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KninoNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  it('debe mostrar el nombre de la empresa correctamente cuando se pasa un valor a KninoName', () => {
    
    component.KninoName = 'Test Company';
    fixture.detectChanges();  

    
    const spanElement = fixture.debugElement.query(By.css('span'));
    expect(spanElement.nativeElement.textContent).toBe('Test Company');
  });

  it('debe mostrar el valor por defecto "Mi Empresa" cuando no se pasa un valor a KninoName', () => {
    
    fixture.detectChanges();  

    const spanElement = fixture.debugElement.query(By.css('span'));
    expect(spanElement.nativeElement.textContent).toBe('Mi Empresa');  
  });

  it('debe mostrar la imagen con la clase "logo"', () => {
    
    const imgElement = fixture.debugElement.query(By.css('img.logo'));

   
    expect(imgElement).toBeTruthy();
    
    expect(imgElement.nativeElement.src).toContain('assets/img/knino_logos.png');
  });
});

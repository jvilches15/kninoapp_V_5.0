import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComidaService } from './comida.service';

describe('ComidaService', () => {
  let service: ComidaService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComidaService]
    });
    service = TestBed.inject(ComidaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    
    httpMock.verify();
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener las categorías desde la API', () => {
    const mockResponse = {
      categories: [
        { strCategory: 'Beef' },
        { strCategory: 'Chicken' }
      ]
    };

    service.getCategorias().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.categories.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${apiUrl}/categories.php`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe obtener alimentos por categoría desde la API', () => {
    const categoria = 'Beef';
    const mockResponse = {
      meals: [
        { strMeal: 'Beef Stew', idMeal: '12345' },
        { strMeal: 'Beef Wellington', idMeal: '67890' }
      ]
    };

    service.getAlimentosPorCategoria(categoria).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.meals.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${apiUrl}/filter.php?c=${categoria}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe obtener detalles de un alimento desde la API', () => {
    const id = '12345';
    const mockResponse = {
      meals: [
        { strMeal: 'Beef Stew', idMeal: '12345', strInstructions: 'Cook beef with vegetables.' }
      ]
    };

    service.getDetallesAlimento(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.meals[0].idMeal).toBe(id);
    });

    const req = httpMock.expectOne(`${apiUrl}/lookup.php?i=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe buscar un alimento por nombre desde la API', () => {
    const busqueda = 'Beef';
    const mockResponse = {
      meals: [
        { strMeal: 'Beef Stew', idMeal: '12345' },
        { strMeal: 'Beef Wellington', idMeal: '67890' }
      ]
    };

    service.buscarAlimento(busqueda).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.meals.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${apiUrl}/search?query=${busqueda}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});

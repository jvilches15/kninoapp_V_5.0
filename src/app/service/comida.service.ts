import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';  

  constructor(private http: HttpClient) { }

  
  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories.php`);
  }

  
  getAlimentosPorCategoria(categoria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filter.php?c=${categoria}`);
  }

  
  getDetallesAlimento(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lookup.php?i=${id}`);
  }

  
  buscarAlimento(buscadoAlimento: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?query=${buscadoAlimento}`);
  }
}


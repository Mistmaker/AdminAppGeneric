import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlWs } from 'src/environments/environment';
import { Categoria } from '../models/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  getCategorias() {
    return this.http.get<Categoria[]>(`${urlWs}/categorias`);
  }

  getCategoria(id: number) {
    return this.http.get<Categoria>(`${urlWs}/categorias/${id}`);
  }
  
  postCategoria(categoria: Categoria) {
    return this.http.post<Categoria>(`${urlWs}/categorias`, categoria);
  }
  
  putCategoria(categoria: Categoria) {
    return this.http.put<Categoria>(`${urlWs}/categorias/${categoria.id}`, categoria);
  }
  
  deleteCategoria(id: number) {
    return this.http.delete<Categoria>(`${urlWs}/categorias/${id}`);
  }
}

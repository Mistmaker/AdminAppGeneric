import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlWs } from 'src/environments/environment';
import { Producto } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get<Producto[]>(`${urlWs}/productos`);
  }

  getProductosCategoria(idCategoria: number) {
    return this.http.get<Producto[]>(`${urlWs}/productos/categoria/${idCategoria}`);
  }

  getProducto(id: number) {
    return this.http.get<Producto>(`${urlWs}/productos/${id}`);
  }

  postProducto(producto: Producto) {
    return this.http.post<Producto>(`${urlWs}/productos`, producto);
  }

  putProducto(producto: Producto) {
    return this.http.put<Producto>(`${urlWs}/productos/${producto.id}`, producto);
  }

  deleteProducto(id: number) {
    return this.http.delete<Producto>(`${urlWs}/productos/${id}`);
  }

}

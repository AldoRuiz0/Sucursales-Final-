import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Productos } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public _http: HttpClient) { }

  obtenerProductos(_token) : Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', _token )

    return this._http.get(this.url + '/productos', { headers: this.headersVariable });
  }

  obtenerProductoId( idProducto): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.token)

    return this._http.get(this.url + '/producto/' + idProducto, { headers: this.headersVariable})
  }

  agregarProductos(modeloProductos: Productos) : Observable<any> {
    let parametros = JSON.stringify(modeloProductos);
    let headersToken = this.headersVariable.set('Authorization', this.token)


    return this._http.post(this.url + '/agregarProductos', parametros, { headers: this.headersVariable });
  }

  editarProducto(modeloProductos: Productos) : Observable<any> {
    let parametro = JSON.stringify(modeloProductos);
    let headersToken = this.headersVariable.set('Authorization', this.token)


    return this._http.put(this.url + '/editarProducto/' + modeloProductos._id, parametro, {headers: this.headersVariable})
  }

  eliminarProducto( idProducto): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.token)



    return this._http.delete(this.url + '/eliminarProducto/' + idProducto, {headers: this.headersVariable})
  }

}

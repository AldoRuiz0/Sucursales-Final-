import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Sucursales } from 'src/app/models/sucursales.model';
import { Productos } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})

export class SucursalesService{

  public url : String = 'http://localhost:3000/api'
  constructor(public _http: HttpClient) { }
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')

  obtenerSucursales(token: any) : Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token )


    return this._http.get(this.url + '/obtenerSucursales', {headers: headersToken});


  }
  agregarSucursales(modeloSucursales: Sucursales, token: any) : Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token )

    let parametros = JSON.stringify(modeloSucursales);

    return this._http.post(this.url + '/agregarSucursal', parametros, { headers: headersToken});
  }
  editarSucursales(modeloSucursales: Sucursales, token: any) : Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token )

    let parametro = JSON.stringify(modeloSucursales);

    return this._http.put(this.url + '/editarSucursal/' + modeloSucursales._id, parametro, {headers: headersToken})
  }


  obtenerSucursalId( idSucursal: any, token: any ): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token )


    return this._http.get(this.url + '/obtenerSucursal/' + idSucursal, { headers: headersToken})
  }
  eliminarSucursal(idSucursal: any, token: any) : Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token )

    return this._http.delete(this.url + '/eliminarSucursales/' + idSucursal, { headers: headersToken})

  }
  obtenerProductos( idSucursal: any, token: any ): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token )


    return this._http.get(this.url + '/obtenerProductos/' + idSucursal, { headers: headersToken})
  }
  venderProducto( modeloProducto: Productos, idSucursal: any, token: any ): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token )

    let parametro = JSON.stringify(modeloProducto);

    return this._http.put(this.url + '/generarVenta/' + modeloProducto._id + '/' + idSucursal, parametro, { headers: headersToken})
  }
  obtenerProductosId(idSucursal: any, token: any, idProducto: any ): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token )


    return this._http.get(this.url + '/obtenerProdid/' + idProducto + '/' + idSucursal, { headers: headersToken})
  }

}

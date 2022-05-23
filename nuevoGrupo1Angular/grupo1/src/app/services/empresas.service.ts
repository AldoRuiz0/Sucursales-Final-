import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Empresas } from '../models/empresa.model';
import { Productos } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  public url : String = 'http://localhost:3000/api'
  constructor(public _http: HttpClient) { }
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')

  obtenerEmpresas(token: any){
    let headersToken = this.headersVariable.set('Authorization', token )

    return this._http.get(this.url + '/obtenerEmpresas', {headers: headersToken });
  }

  agregarEmpresas(modeloEmpresa: Empresas, token: any){
    let headersToken = this.headersVariable.set('Authorization', token);

    let parametros = JSON.stringify(modeloEmpresa);

    return this._http.post(this.url + '/agregarEmpresa', parametros, {headers: headersToken })
  }
  obtenerproductos(token: any){
    let headersToken = this.headersVariable.set('Authorization', token )

    return this._http.get(this.url + '/obtenerProductosEmpresa', {headers: headersToken })

  }
  agregarProductos(modeloProducto: Productos,token: any){
    let parametros = JSON.stringify(modeloProducto);

    let headersToken = this.headersVariable.set('Authorization', token )

    return this._http.put(this.url + '/agregarProductosEmpresa', parametros,{headers: headersToken })

  }
  eliminarProductos(idProducto: any, token: any){
    let headersToken = this.headersVariable.set('Authorization', token )

    return this._http.delete(this.url + '/eliminarProductosEmpresa/' + idProducto, { headers: headersToken})
  }
  editarProductos(modeloProducto: Productos,token: any){
    let headersToken = this.headersVariable.set('Authorization', token)

    let parametro = JSON.stringify(modeloProducto);

    return this._http.put(this.url + '/editarProductosEmpresa/' + modeloProducto._id, parametro, {headers: headersToken} )


  }
  obtenerProductosId( idProducto: any, token: any ){
    let headersToken = this.headersVariable.set('Authorization', token )


    return this._http.get(this.url + '/obtenerProductoEmpresa/' + idProducto, { headers: headersToken})
  }

  agregarProductosSucursal(modeloProducto: Productos,token: any, idSucursal: any, idProducto: any){
    let parametros = JSON.stringify(modeloProducto);

    let headersToken = this.headersVariable.set('Authorization', token )

    return this._http.put(this.url + '/agregarProductosSucursal/'+ idSucursal + '/' + idProducto, parametros,{headers: headersToken })

  }
}

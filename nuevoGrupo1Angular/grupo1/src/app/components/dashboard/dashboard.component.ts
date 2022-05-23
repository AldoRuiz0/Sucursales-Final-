import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursales } from 'src/app/models/sucursales.model';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [SucursalesService]
})
export class DashboardComponent implements OnInit {
  public sucursalModelGet!: Sucursales | any;
  public sucursalModelPost: Sucursales;
  public sucursalModelGetId: Sucursales;


  public token;
  constructor(private _sucursalesService: SucursalesService,
    private _usuarioService: UsuarioService,
    private _router: Router) {
    this.sucursalModelPost = new Sucursales(
      '',
      '',
      '',
      [{
        nombreProducto: '',
        precioProducto: 0,
        stock: 0
      }],
      ''
    )
    this.token = this._usuarioService.getToken();
    this.sucursalModelGetId = new Sucursales(
      '',
      '',
      '',
      [{
        nombreProducto: '',
        precioProducto: 0,
        stock: 0
      }],
      ''
    )
   }

  ngOnInit(): void {
    this.getSucursales();
  }
  getSucursales(){
    this._sucursalesService.obtenerSucursales(this.token).subscribe(
      (response) => {
        this.sucursalModelGet = response.sucursales;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);

      }
    )
  }
  postSucursales(){
    this._sucursalesService.agregarSucursales(this.sucursalModelPost, this.token).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursales();
        this.sucursalModelPost.nombre = '';
        this.sucursalModelPost.direccion = '';
        this.sucursalModelPost.idEmpresa = '';
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto agregado de forma correcta',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
  putSucursales(){
    this._sucursalesService.editarSucursales(this.sucursalModelGetId, this.token).subscribe(

      (response)=>{
        console.log(response);
        this.getSucursales();
      },
      (error)=>{

      }

    )
  }

  getSucursalesId(idSucursal: any){
    this._sucursalesService.obtenerSucursalId(idSucursal, this.token).subscribe(
      (response)=>{
        console.log(response);
        this.sucursalModelGetId = response.sucursal;
      },
      (error)=>{
      }
    )
  }
  deleteSucursales(id: any){
    this._sucursalesService.eliminarSucursal(id, this.token).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursales();

      }
    )
  }
  sucursal(){
  }
}

import { Component, OnInit } from '@angular/core';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/models/productos.model';
import { Sucursales } from 'src/app/models/sucursales.model';
@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss'],
  providers: [SucursalesService, UsuarioService]
})

export class SucursalComponent implements OnInit {
  public token;
  public productosModelGet: Productos | any;
  public idSucursal: String | any;
  public productosModelGetId: Productos;
  public sucursalModelGetId: Sucursales;
  public nombreSuc!: '';
  constructor(
    public _sucursalService: SucursalesService,
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute

  ) {
    this.token = this._usuarioService.getToken();
    this.productosModelGetId = new Productos(
      '',
      '',
      [],
      [{idProveedor:""}],
      0,
      0
    ),
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
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      console.log(dataRuta.get('idSucursal'));
      this.getSucursalId(dataRuta.get('idSucursal'))
      this.idSucursal = dataRuta.get('idSucursal')
      this.getSucursalesId(dataRuta.get('idSucursal'))
    })
  }



  getSucursalId(idSucursal: any){
    this._sucursalService.obtenerProductos(idSucursal, this.token).subscribe(
      (response)=>{
        console.log(response.productos);
        this.productosModelGet = response.productos;
      },
      (error)=>{
        console.log('Hubo un error');

      }
    )
  }
  venderProducto(){
    this._sucursalService.venderProducto(this.productosModelGetId,this.idSucursal, this.token).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursalId(this.idSucursal)
      },
      (error)=>{
        console.log(this.productosModelGetId, this.idSucursal, this.productosModelGetId._id);

      }
    )
  }
  getProdId(idProd: any){
    this._sucursalService.obtenerProductosId(this.idSucursal, this.token, idProd).subscribe(
      (response)=>{
        console.log(response);
        this.productosModelGetId = response.productos;
      },
      (error)=>{

      }
    )
  }
  getSucursalesId(idSucursal: any){
    this._sucursalService.obtenerSucursalId(idSucursal, this.token).subscribe(
      (response)=>{
        console.log(response);
        this.sucursalModelGetId = response.sucursal;
      },
      (error)=>{

      }
    )
  }
}

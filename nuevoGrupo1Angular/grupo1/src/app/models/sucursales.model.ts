export class Sucursales{
  
  constructor(
    public _id: String,
    public nombre: String,
    public direccion: String,
    public productos: [{
      nombreProducto: String,
      precioProducto: Number,
      stock: Number
    }],
    public idEmpresa: String,
  ){}
}

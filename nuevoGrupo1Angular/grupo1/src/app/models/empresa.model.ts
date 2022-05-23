export class Empresas{
constructor(

    public nombre: String,
    public ubicacion: String, 
    public descripcion: String,
    public rol: String, 
    public sucursales: [{
        nombre: String, 
        ubicacion: String, 
    }]

){}


}
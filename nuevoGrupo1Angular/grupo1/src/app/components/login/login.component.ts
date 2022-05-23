import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
  //encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public usuarioModel: Usuario;

  constructor(private _usuarioService: UsuarioService) {
    this.usuarioModel = new Usuario(
    '',
    '',
    '',
    '',
    ''
    );
  }

  ngOnInit(): void {
  }

  getToken(){
    this._usuarioService.login(this.usuarioModel).subscribe(
      (response)=>{
        console.log(response.token);
        localStorage.setItem("token", response.token)
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  login(){
    this._usuarioService.login(this.usuarioModel).subscribe(
      (response)=>{
        console.log(response.usuario);
        localStorage.setItem('identidad', JSON.stringify(response.usuario))
        this.getToken();
      },
      (error)=>{
        console.log(<any>error);
      }
    );
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagPrincipalComponent } from './components/pag-principal/pag-principal.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'pag-principal', component: PagPrincipalComponent},
  {path: "empresas", component: EmpresasComponent},
  {path: "sucursal", component:SucursalComponent},
  {path: "navbar", component:NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

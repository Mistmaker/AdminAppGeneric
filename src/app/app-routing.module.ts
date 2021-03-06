import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RepositorioArchivosComponent } from './components/repositorio-archivos/repositorio-archivos.component';
import { ArchivoComponent } from './components/archivo/archivo.component';
import { EnlacesComponent } from './components/enlaces/enlaces.component';
import { EnlaceComponent } from './components/enlace/enlace.component';
import { AuthGuard } from './guards/auth.guard';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { EvaluacionesComponent } from './components/evaluaciones/evaluaciones.component';
import { GrupoEvaluacionesComponent } from './components/grupo-evaluaciones/grupo-evaluaciones.component';
import { GrupoEvaluacionComponent } from './components/grupo-evaluacion/grupo-evaluacion.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
  { path: 'categorias/:id', component: CategoriaComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'productos/:id', component: ProductoComponent, canActivate: [AuthGuard] },
  { path: 'repositorio', component: RepositorioArchivosComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/:id', component: ArchivoComponent, canActivate: [AuthGuard] },
  { path: 'links', component: EnlacesComponent, canActivate: [AuthGuard] },
  { path: 'links/:id', component: EnlaceComponent, canActivate: [AuthGuard] },
  { path: 'noticias', component: NoticiasComponent, canActivate: [AuthGuard] },
  { path: 'noticias/:id', component: NoticiaComponent, canActivate: [AuthGuard] },
  { path: 'grupo-evaluaciones', component: GrupoEvaluacionesComponent, canActivate: [AuthGuard] },
  { path: 'grupo-evaluaciones/:id', component: GrupoEvaluacionComponent, canActivate: [AuthGuard] },
  { path: 'evaluaciones', component: EvaluacionesComponent, canActivate: [AuthGuard] },
  { path: 'evaluaciones/:id', component: EvaluacionComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

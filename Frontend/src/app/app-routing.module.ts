// Angular ===================================================================
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(mod => mod.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

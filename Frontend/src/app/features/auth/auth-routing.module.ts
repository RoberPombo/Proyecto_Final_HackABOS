// Angular ===================================================================
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Locals ====================================================================
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

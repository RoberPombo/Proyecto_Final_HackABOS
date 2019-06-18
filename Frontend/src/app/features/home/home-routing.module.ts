// Angular ===================================================================
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Locals ====================================================================
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(mod => mod.UserModule),
      },
      {
        path: 'players',
        loadChildren: () => import('../player/player.module').then(mod => mod.PlayerModule),
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

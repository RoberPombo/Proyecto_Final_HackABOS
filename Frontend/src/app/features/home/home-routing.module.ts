// Angular ===================================================================
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Locals ====================================================================
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'players/:id/youtube',
        loadChildren: () => import('../youtube/youtube.module').then(mod => mod.YoutubeModule),
      },
      {
        path: 'players',
        loadChildren: () => import('../players/players.module').then(mod => mod.PlayersModule),
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(mod => mod.UserModule),
      },
      {
        path: 'players/:id',
        loadChildren: () => import('../player/player.module').then(mod => mod.PlayerModule),
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/user',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

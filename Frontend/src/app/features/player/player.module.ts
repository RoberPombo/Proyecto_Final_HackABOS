import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PlayerProfileComponent,
  }
];

@NgModule({
  declarations: [PlayerProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PlayerModule { }

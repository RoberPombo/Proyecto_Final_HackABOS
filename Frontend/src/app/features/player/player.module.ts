import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatNativeDateModule, MatCardModule } from '@angular/material';


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
    CoreModule,
    LayoutModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class PlayerModule { }

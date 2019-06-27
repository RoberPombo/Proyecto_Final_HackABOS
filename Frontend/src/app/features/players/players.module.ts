import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersListComponent } from './players-list/players-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';


const routes: Routes = [
  {
    path: '',
    component: PlayersListComponent,
  }
];


@NgModule({
  declarations: [PlayersListComponent],
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class PlayersModule { }

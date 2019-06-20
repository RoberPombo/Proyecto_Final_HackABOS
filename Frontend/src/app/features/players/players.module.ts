import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersListComponent } from './players-list/players-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forChild(routes),
  ]
})
export class PlayersModule { }

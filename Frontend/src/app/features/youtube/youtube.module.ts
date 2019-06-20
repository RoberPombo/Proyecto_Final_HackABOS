import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from 'src/app/core/core.module';
import { MatCardModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  }
];



@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
  ]
})
export class YoutubeModule { }

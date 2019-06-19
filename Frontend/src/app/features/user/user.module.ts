import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  }
];


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTabsModule
  ]
})
export class UserModule { }

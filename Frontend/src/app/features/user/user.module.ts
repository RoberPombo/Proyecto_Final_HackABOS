import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonToggleModule } from '@angular/material';
import { UserComponent } from './user/user.component';
import { UserRoutingModule } from './user-routing.module';
import { FavoritePlayersComponent } from './favorite-players/favorite-players.component';



@NgModule({
  declarations: [
    UserComponent,
    FavoritePlayersComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    UserRoutingModule,
    SharedModule,
    MatButtonToggleModule
  ]
})
export class UserModule { }

// Angular ===================================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Router ====================================================================
import { HomeRoutingModule } from './home-routing.module';
// Locals ====================================================================
import { HomeComponent } from './home/home.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    LayoutModule,
    SharedModule,
  ]
})
export class HomeModule { }

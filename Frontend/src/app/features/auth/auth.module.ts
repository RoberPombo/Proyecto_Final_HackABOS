// Angular ===================================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Router ====================================================================
import { AuthRoutingModule } from './auth-routing.module';
// Angular Materia ===========================================================
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material/';
// Locals ====================================================================
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    CoreModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInputComponent } from './components/form-fields/email-input/email-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { PasswordInputComponent } from './components/form-fields/password-input/password-input.component';
import { PasswordMatchInputComponent } from './components/form-fields/password-match-input/password-match-input.component';


const MaterialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];


@NgModule({
  declarations: [
    EmailInputComponent,
    PasswordInputComponent,
    PasswordMatchInputComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    MaterialModules,
    ReactiveFormsModule,
  ],
  exports: [
    EmailInputComponent,
    MaterialModules,
    PasswordInputComponent,
    PasswordMatchInputComponent,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }

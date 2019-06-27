import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInputComponent } from './components/form-fields/email-input/email-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { PasswordInputComponent } from './components/form-fields/password-input/password-input.component';
import { PasswordMatchInputComponent } from './components/form-fields/password-match-input/password-match-input.component';
import { AdaptiveFieldComponent } from './components/form-fields/adaptive-field/adaptive-field.component';
import { ShowAgePipe } from './pipes/show-age.pipe';
import { AutocompleteFieldComponent } from './components/form-fields/autocomplete-field/autocomplete-field.component';
import { FilterPipe } from './pipes/filter.pipe';


const MaterialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
];


@NgModule({
  declarations: [
    AdaptiveFieldComponent,
    AutocompleteFieldComponent,
    EmailInputComponent,
    PasswordInputComponent,
    PasswordMatchInputComponent,
    ShowAgePipe,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    MaterialModules,
    ReactiveFormsModule,
  ],
  exports: [
    AdaptiveFieldComponent,
    AutocompleteFieldComponent,
    EmailInputComponent,
    MaterialModules,
    PasswordInputComponent,
    PasswordMatchInputComponent,
    ReactiveFormsModule,
    ShowAgePipe,
    FilterPipe,
  ]
})
export class SharedModule { }

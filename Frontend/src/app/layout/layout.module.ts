// Angular ===================================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Material Angular  =========================================================
import {
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
// Locals ====================================================================
import { DialogComponent } from './dialog/dialog.component';
import { CoreModule } from '../core/core.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


const ModulesMaterial = [
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
];


@NgModule({
  declarations: [
    DialogComponent,
    SnackbarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    ModulesMaterial,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  entryComponents: [DialogComponent, SnackbarComponent]
})
export class LayoutModule { }

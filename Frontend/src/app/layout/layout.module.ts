// Angular ===================================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Material Angular  =========================================================
import {
  MatDialogModule,
  MatInputModule,
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
// Locals ====================================================================
import { DialogComponent } from './dialog/dialog.component';
import { CoreModule } from '../core/core.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

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
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  entryComponents: [DialogComponent, SnackbarComponent]
})
export class LayoutModule { }

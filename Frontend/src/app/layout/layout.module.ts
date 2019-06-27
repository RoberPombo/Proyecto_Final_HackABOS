// Angular ===================================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Material Angular  =========================================================
import { LayoutModule as MatLayoutModule } from '@angular/cdk/layout'
import {
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
// Locals ====================================================================
import { DialogComponent } from './dialog/dialog.component';
import { CoreModule } from '../core/core.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderComponent } from './loader/loader.component';


const ModulesMaterial = [
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
];


@NgModule({
  declarations: [
    DialogComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SnackbarComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatLayoutModule,
    ReactiveFormsModule,
    SharedModule,
    ModulesMaterial,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SnackbarComponent,
  ],
  entryComponents: [DialogComponent],
})
export class LayoutModule { }

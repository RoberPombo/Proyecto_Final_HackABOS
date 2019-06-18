import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/layout/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar,
  ) { }


  openSnackbar(message: string, type: string, duration: number) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: duration * 1000,
      data: message,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [type]
    });
  }
}

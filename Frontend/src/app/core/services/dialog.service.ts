// Angular ===================================================================
import { Injectable } from '@angular/core';
// Material Angular  =========================================================
import { MatDialog } from '@angular/material';
// Locals ====================================================================
import { DialogComponent } from 'src/app/layout/dialog/dialog.component';
import { DialogModal } from 'src/app/layout/dialog/dialog.models';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }


  openDialog(typeDialog: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: new DialogModal(typeDialog),
    });

    return dialogRef.afterClosed();
  }
}

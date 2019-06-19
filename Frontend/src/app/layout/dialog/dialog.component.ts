// Angular ===================================================================
import { Component, Inject, Input, OnInit } from '@angular/core';
// Material Angular  =========================================================
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// Locals ====================================================================
import { DialogModal } from './dialog.models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() public dialogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogModal,
  ) { }

  ngOnInit() {
    this.dialogForm = this.fb.group({
    });
  }

  confirm() {
    if (this.data.type === 'infoActivationEmail' || this.data.type === 'infoForgotPassword') {
      return this.dialogRef.close();
    }
    if (this.dialogForm.valid) {
      const formValues: any = (Object.keys(this.dialogForm.value).reduce((c, k) => {
        c[k] = this.dialogForm.value[k][k];
        return c;
      }, {}));

      return this.dialogRef.close(formValues);
    }
  }

}

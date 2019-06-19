export class DialogModal {
  type: string;
  title: string;
  message: string;
  note: string;
  formFields: string[];
  buttonAccept: string;
  buttonCancel: string;

  constructor(type: string) {
    if (type === 'infoActivationEmail') {
      this.type = type;
      this.title = 'dialog.infoActivationEmail.title';
      this.message = 'dialog.infoActivationEmail.message';
      this.note = 'dialog.infoActivationEmail.note';
      this.formFields = [];
      this.buttonAccept = 'dialog.infoActivationEmail.accept';
      this.buttonCancel = '';
    } else if (type === 'resendActivationEmail') {
      this.type = type;
      this.title = 'dialog.resendActivationEmail.title';
      this.message = 'dialog.resendActivationEmail.message';
      this.note = 'dialog.resendActivationEmail.note';
      this.formFields = ['email'];
      this.buttonAccept = 'dialog.resendActivationEmail.accept';
      this.buttonCancel = '';
    } else if (type === 'infoForgotPassword') {
      this.type = type;
      this.title = 'dialog.infoForgotPassword.title';
      this.message = 'dialog.infoForgotPassword.message';
      this.note = 'dialog.infoForgotPassword.note';
      this.formFields = [];
      this.buttonAccept = 'dialog.infoForgotPassword.accept';
    } else if (type === 'forgotPassword') {
      this.type = type;
      this.title = 'dialog.forgotPassword.title';
      this.message = 'dialog.forgotPassword.message';
      this.note = 'dialog.forgotPassword.note';
      this.formFields = ['email', 'password', 'confirmPassword'];
      this.buttonAccept = 'dialog.forgotPassword.accept';
      this.buttonCancel = 'dialog.forgotPassword.cancel';
    }
  }
}

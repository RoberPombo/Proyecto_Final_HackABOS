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
      this.title = 'dialog.info_activation_email.title';
      this.message = 'dialog.info_activation_email.message';
      this.note = 'dialog.info_activation_email.note';
      this.formFields = [];
      this.buttonAccept = 'dialog.info_activation_email.accept';
      this.buttonCancel = '';
    } else if (type === 'resendActivationEmail') {
      this.type = type;
      this.title = 'dialog.resend_activation_email.title';
      this.message = 'dialog.resend_activation_email.message';
      this.note = 'dialog.resend_activation_email.note';
      this.formFields = ['email'];
      this.buttonAccept = 'dialog.resend_activation_email.accept';
      this.buttonCancel = '';
    } else if (type === 'infoForgotPassword') {
      this.type = type;
      this.title = 'dialog.info_forgot_password.title';
      this.message = 'dialog.info_forgot_password.message';
      this.note = 'dialog.info_forgot_password.note';
      this.formFields = [];
      this.buttonAccept = 'dialog.info_forgot_password.accept';
    } else if (type === 'forgotPassword') {
      this.type = type;
      this.title = 'dialog.forgot_password.title';
      this.message = 'dialog.forgot_password.message';
      this.note = 'dialog.forgot_password.note';
      this.formFields = ['email', 'password', 'confirmPassword'];
      this.buttonAccept = 'dialog.forgot_password.accept';
      this.buttonCancel = 'dialog.forgot_password.cancel';
    }
  }
}

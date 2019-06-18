// Angular ===================================================================
import { FormGroup } from '@angular/forms';


export function matchPasswordValidator(group: FormGroup) {
  const password = group.get('password').value;
  const confirmPassword = group.get('confirmPassword').value;

  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }

  return null;
}

// Angular ===================================================================
import { FormControl } from '@angular/forms';


export function passwordPatternValidator(control: FormControl) {
  const password = control.value;
  const passwordRegex = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{8,16}$/;

  if (!passwordRegex.test(password)) {
    return { passwordNoPattern: true };
  }

  return null;
}

// Angular ===================================================================
import { FormControl } from '@angular/forms';


export function emailPatternValidator(control: FormControl) {
  const email = control.value;
  const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

  if (!emailRegex.test(email)) {
    return { emailNoPattern: true };
  }

  return null;
}

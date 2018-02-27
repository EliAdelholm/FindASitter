
import { FormControl } from "@angular/forms";

export class PasswordValidator {

    static getPasswordValidator() {
        return function passwordValidator(control: FormControl): { [s: string]: boolean } {

            // Password must be at least 8 chars, one lowercase letter, one uppercase letter and one number
            if (!control.value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])")) {
                return { invalidPassword: true };
            }

            return null;
        }
    }
}
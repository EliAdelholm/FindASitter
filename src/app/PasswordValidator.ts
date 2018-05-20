
import { FormControl, AbstractControl } from "@angular/forms";

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

    static getMatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password != confirmPassword) {
            AC.get('confirmPassword').setErrors({ matchPassword: true })
        } else {
            return null
        }
    }
}
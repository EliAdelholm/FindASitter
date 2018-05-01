import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

export class EmailValidator {

    constructor(private http: HttpClient) {}

    static getEmailValidator() {
        return function emailValidator(control: FormControl): { [s: string]: boolean } {

            const check = this.http.get('/api/lookup-email/' + control.value);
            console.log(control.value, check)
            
            // Password must be at least 8 chars, one lowercase letter, one uppercase letter and one number
            // if (!control.value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])")) {
            //     return { invalidPassword: true };
            // }

            return null;
        }
    }
}
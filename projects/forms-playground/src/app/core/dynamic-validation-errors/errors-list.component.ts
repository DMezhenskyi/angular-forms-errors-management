import { KeyValuePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'errors-list',
  standalone: true,
  imports: [KeyValuePipe],
  template: `
    <!-- Iterate through the errors object and display
         error messages depending on the error key (name of validator).
         All the error keys and the corresponding messages you can get
         by injecting the ERROR_MESSAGES token we created earlier.
    -->
    @for(error of errors | keyvalue; track error.key) {
      <div class="input-error">{{errorMessages[error.key]}}</div>
    }
  `,
  styles: [`:host { display: block; }`],
})
export class ErrorsListComponent {
  errorMessages: { [key: string]: string } = {
    required: `This field is required`,
    email: `It should be a valid email`,
    minlength: `The value is too short`,
    pattern: `Field has wrong format`,
    banWords: `This word is not allowed`,
    uniqueName: `This nickname is already taken`,
  }
  @Input()
  errors?: ValidationErrors | undefined;
}

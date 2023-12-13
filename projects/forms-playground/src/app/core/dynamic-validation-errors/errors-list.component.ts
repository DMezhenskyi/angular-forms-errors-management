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
    <div class="input-error">__Error Message Here__</div>
  `,
  styles: [`:host { display: block; }`],
})
export class ErrorsListComponent {
  @Input()
  errors?: ValidationErrors | undefined;
}

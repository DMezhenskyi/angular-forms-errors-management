import { Directive, inject } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[validationErrorTracker]',
  standalone: true,
})
export class ValidationErrorTrackerDirective {
  formControl = inject(FormControlName, {self: true});
  /**
   * This directive is responsible for listening to the status changes (Valid/Invalid)
   * of the formControl which resides on the same node with this directive.
   * If it happens, that the control is invalid, the directive should create dynamically
   * the instance of the errors-list component and pass errors from the form control
   * as an input for errors-list component. Otherwise, the component has to be destroyed.
   */
}

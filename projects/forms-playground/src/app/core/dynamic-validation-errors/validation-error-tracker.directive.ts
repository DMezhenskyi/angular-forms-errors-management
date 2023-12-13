import { ComponentRef, Directive, OnDestroy, OnInit, ViewContainerRef, inject } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { ErrorsListComponent } from './errors-list.component';
import { Subscription, startWith } from 'rxjs';
import { ErrorDisplayStrategy } from './error-display-strategy.service';

@Directive({
  selector: '[validationErrorTracker], [formControlName]',
  standalone: true,
})
export class ValidationErrorTrackerDirective implements OnInit, OnDestroy {
  formControl = inject(FormControlName, {self: true});
  container = inject(ViewContainerRef);
  errorListRef: ComponentRef<ErrorsListComponent> | null = null;

  errorDisplayStrategy = inject(ErrorDisplayStrategy);

  #formControlStatus!: Subscription;
  /**
   * This directive is responsible for listening to the status changes (Valid/Invalid)
   * of the formControl which resides on the same node with this directive.
   * If it happens, that the control is invalid, the directive should create dynamically
   * the instance of the errors-list component and pass errors from the form control
   * as an input for errors-list component. Otherwise, the component has to be destroyed.
   */
  ngOnInit() {
    this.#formControlStatus = this.formControl.control.statusChanges.pipe(
      startWith(this.formControl.control.status)
    ).subscribe(() => {
      if (this.errorDisplayStrategy.isErrorVisible(this.formControl.control)) {
        if (!this.errorListRef) {
          this.errorListRef = this.container.createComponent(ErrorsListComponent);
        }
        this.errorListRef.setInput('errors', this.formControl.control.errors);
      } else {
        this.errorListRef?.destroy();
        this.errorListRef = null;
      }
    })
  }
  ngOnDestroy() {
    this.#formControlStatus.unsubscribe();
  }
}

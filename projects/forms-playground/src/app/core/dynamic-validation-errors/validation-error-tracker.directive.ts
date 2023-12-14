import { ComponentRef, Directive, ElementRef, OnDestroy, OnInit, ViewContainerRef, inject } from '@angular/core';
import { ControlContainer, FormControlDirective, FormControlName, FormGroupDirective, NgControl } from '@angular/forms';
import { ErrorsListComponent } from './errors-list.component';
import { Subscription, fromEvent, merge, startWith } from 'rxjs';
import { ErrorDisplayStrategy } from './error-display-strategy.service';

@Directive({
  selector: `
    [formControlName]:not([withoutValidationErrors]),
    [formControl]:not([withoutValidationErrors])
  `,
  standalone: true
})
export class ValidationErrorTrackerDirective implements OnInit, OnDestroy {
  formControl = inject(NgControl, {self: true}) as FormControlName | FormControlDirective;

  // getting the instance of the parent form directive instance through the closest form group;
  form = inject(ControlContainer, { optional: true })?.formDirective as FormGroupDirective | null 
  
  container = inject(ViewContainerRef);
  errorListRef: ComponentRef<ErrorsListComponent> | null = null;

  errorDisplayStrategy = inject(ErrorDisplayStrategy);

  #formControlStatus!: Subscription;
  #nativeEl = inject(ElementRef).nativeElement;

  ngOnInit() {
    this.#formControlStatus = merge(
      this.formControl.control.statusChanges,
      fromEvent(this.#nativeEl, 'blur') //<-- add support for blur event
    ).pipe(
      startWith(this.formControl.control.status)
    ).subscribe(() => {
      if (this.errorDisplayStrategy.isErrorVisible(this.formControl.control, this.form)) {
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

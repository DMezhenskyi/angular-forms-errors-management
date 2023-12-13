import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

export interface ErrorDisplayStrategy {
  isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | null): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorDisplayStrategy implements ErrorDisplayStrategy {
  /**
   * isErrorVisible() of this service contains the logic of when the error message has to be displayed.
   * If this method returns `true` the error message will be visible and hidden otherwise.
   * isErrorVisible() takes in arguments the corresponding form control model, so...
   * just check if control is valid/touched/dirty/etc and return true/false depending on it
   */
  isErrorVisible(control: AbstractControl | null, form?: FormGroupDirective | null) {
    return control && control.invalid && control.dirty;
  }
}
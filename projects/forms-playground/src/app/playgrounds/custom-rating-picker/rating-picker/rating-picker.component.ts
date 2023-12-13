import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'app-rating-picker',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rating-picker.component.html',
  styleUrl: './rating-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      // needed for angular to resolve your component as ValueAccessor
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingPickerComponent,
      multi: true
    }
  ]
})
export class RatingPickerComponent implements ControlValueAccessor {

  #onChange = (newValue: RatingOptions) => {}
  #onTouch = () => {}

  @Input()
  value: RatingOptions = null;

  @Input()
  disabled = false;

  @Output()
  change = new EventEmitter<RatingOptions>();

  @HostBinding('attr.tabindex')
  tabIndex = 0; // <-- makes host element focusable

  @HostListener('blur')
  onBlur() {
    this.#onTouch() // <-- marking FormControl model as "touched"
  }

  setValue(value: RatingOptions) {
    this.value = value;
    this.#onChange(value); // <- updating FormControl model value
  }
  writeValue(rating: RatingOptions) {
    // this method will be called by Angular every time
    // when the value of the corresponding FormControl() model is changed.
    // Use this method to sync value from the FormControl model
    // with the value property of you component
    this.value = rating;
  }
  registerOnChange(fn: any) {
    // registerOnChange is called once during the [formControlName] initialization
    // after that you just reuse this.#onChange whenever you need
    this.#onChange = fn;
  }
  registerOnTouched(fn: any) {
    // registerOnTouched is called once during the [formControlName] initialization
    // after that you just reuse this.#onTouch whenever you need
    this.#onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean) {
    // this method will be called by Angular every time
    // when the corresponding FormControl() changes the 'disabled' state

    this.disabled = isDisabled;
  }
}

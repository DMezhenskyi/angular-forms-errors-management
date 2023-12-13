import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { banWords } from '../../../core/validators/ban-words.validator';
import { NicknameCheckerValidator } from '../../../core/validators/nickname-checker.validator';
import { startWith, tap } from 'rxjs';
import { ValidationErrorTrackerDirective } from '../../../core/dynamic-validation-errors/validation-error-tracker.directive';

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorTrackerDirective],
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './reactive-forms-page.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactiveFormsPageComponent implements OnInit {
  nicknameChecker = inject(NicknameCheckerValidator);
  cdr = inject(ChangeDetectorRef);
  form = new FormGroup({
    displayName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      banWords(['test']),
    ]),
    nickname: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[\w.]+$/),
        banWords(['test', 'anonymous']),
      ],
      asyncValidators: [
        this.nicknameChecker.validate.bind(this.nicknameChecker),
      ],
      updateOn: 'blur',
    }),
    email: new FormControl('', [Validators.required, Validators.email]),
    yearOfBirth: new FormControl(1991),
    passportNumber: new FormControl<number | null>(null),
    address: new FormGroup({
      fullAddress: new FormControl(''),
      city: new FormControl(''),
      postCode: new FormControl(''),
    }),
  });
  onSubmit() {
    if (!this.form.invalid) {
      console.log(this.form.getRawValue());
    }
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  ngOnInit(): void {
    this.form
      .get('nickname')
      ?.statusChanges.subscribe(() => this.cdr.markForCheck());
    this.form.controls.yearOfBirth.valueChanges
      .pipe(
        tap(() => this.form.controls.passportNumber.markAsDirty()),
        startWith(this.form.controls.yearOfBirth.value)
      )
      .subscribe((yearOfBirth) => {
        this.isAdult(yearOfBirth)
          ? this.form.controls.passportNumber.addValidators(Validators.required)
          : this.form.controls.passportNumber.removeValidators(
              Validators.required
            );
        this.form.controls.passportNumber.updateValueAndValidity();
      });
  }
  private isAdult(yearOfBirth: number | null): boolean {
    if (!yearOfBirth) {
      return false;
    }
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth >= 18;
  }
}

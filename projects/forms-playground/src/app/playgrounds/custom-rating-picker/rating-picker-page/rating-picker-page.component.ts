import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  RatingOptions,
  RatingPickerComponent,
} from '../rating-picker/rating-picker.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-picker-page',
  standalone: true,
  imports: [RatingPickerComponent, ReactiveFormsModule],
  templateUrl: './rating-picker-page.component.html',
  styleUrls: ['../../common-page.scss', './rating-picker-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RatingPickerPageComponent implements OnInit {
  form = new FormGroup({
    feedback: new FormControl(''),
    rating: new FormControl<RatingOptions>('good'),
  });

  onSubmit() {
    console.log(this.form.getRawValue());
  }

  ngOnInit() {
    // uncomment a string bellow to see how UI reacts on disabled state of the model.
    // this.form.controls.rating.disable()
  }
}

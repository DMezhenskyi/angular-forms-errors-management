import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Reactive Forms Playground',
    loadComponent: () =>
      import(
        './playgrounds/reactive-forms/reactive-forms-page/reactive-forms-page.component'
      ),
  },
  {
    path: 'custom-rating-picker',
    title: 'Custom Rating Picker Playground',
    loadComponent: () =>
      import(
        './playgrounds/custom-rating-picker/rating-picker-page/rating-picker-page.component'
      ),
  },
];

import { InjectionToken } from '@angular/core';
// this injection token should contain key/value pair for all validators
// that are used in your application. It might look like the following...
// Example: ({ required: 'This field is required', ... })
export const ERROR_MESSAGES = new InjectionToken('Validation Errors', {
  providedIn: 'root',
  factory: () => ({}),
});

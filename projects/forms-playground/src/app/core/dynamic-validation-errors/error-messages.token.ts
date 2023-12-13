import { InjectionToken } from '@angular/core';
// this injection token should contain key/value pair for all validators
// that are used in your application. It might look like the following...
// Example: ({ required: 'This field is required', ... })
export const ERROR_MESSAGES_LIST = {
  required: `This field is required`,
  email: `It should be a valid email`,
  minlength: `The value is too short`,
  pattern: `Field has wrong format`,
  banWords: `This word is not allowed`,
  uniqueName: `This nickname is already taken`,
};
export const ERROR_MESSAGES = new InjectionToken<{ [key: string]: string }>('Validation Errors', {
  providedIn: 'root',
  factory: () => ERROR_MESSAGES_LIST,
});

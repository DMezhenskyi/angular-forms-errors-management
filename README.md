# AdvancedAngularForms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Steps

### Block 1 - Creating the error list component when control is invalid

1. Import `ValidationErrorTrackerDirective` into `ReactiveFormsPageComponent` component imports
and apply this directive to any form control you want. Make sure that this directive is applied
to the element and resides on the node along with formControlName directive.
2. In `ValidationErrorTrackerDirective` directive inject the instance of `FormControlName` directive.
Make sure that you injected the instance of the `FormControlName` which resides on the same node
with the `ValidationErrorTrackerDirective`
3. In `ValidationErrorTrackerDirective` after the directive initialization, create
a subscription to the validation status changes of the `FormControl` that is assosiated with
the injected `FormControlName` directive. Make sure that you recive statuses inside `.subscribe()` handler.
4. Now, inside the `.subscribe()` write a logic which dynamically creates an `ErrorsListComponent` component.
To achieve that, you would need perform a folowing steps:
- To create a component, you need a special container which recides on the same HTML node with directive. It is called
`ViewContainerRef` and exactly this token you have to inject in your directive;
- next to it create a new property like `errorListRef` with type `ComponentRef<ErrorsListComponent> | null`. We will need it later.
- inside the `.subscribe()` create a simple if/else statement. If the status of control is INVALID then create and instance of
of class `ErrorsListComponent` using the `createComponent()` method of the `ViewContainerRef`. The instance of created component
assign to a newly created `errorListRef` property.
- In the 'else' block, you have to destroy the created instance of `ErrorsListComponent` component. For that use `destroy()` method
of the `errorListRef`. Once you destroyed it, you have to 'nullify' the `errorListRef` by setting it back to `null`. Now go to the 
browser and make sure that `ErrorsListComponent` appears when the control is invalid and disapers otherwise.
- You probably noticed, that sometimes the `ErrorsListComponent` is created multiple times.
This is because INVALID status emited multiple times. You can improve it by making
an additional check and prevent component creation if the list already created.
if it is already created.
- Now you can go to `reactive-forms-page.component.html` and remove all the validator messages related to the form control
with `validationErrorTracker` directive applied. Since now, we will rely on the dynamically created error list ;)
5. At this point error appears after we interact with an input. This is because subscription
to formControl status doesn't have an initial value. Add the initial value to the stream and take a 
corresponding value from the injected form control. Make sure that now error list is rendered instantly.
6. Let's fix the memory leak. Destroy the stream when directive is destroyed.

### Block 2 - Display proper error messages

7. Every time when status of form control model changes, set up the input `errors` for `ErrorsListComponent`
using the method `setInput` method from `errorListRef`. The value of it must be an errors object which 
you can retrieve from the injected FormControl model.
8. Go to `ErrorsListComponent` component and try to iterate through this error object you provided as an input.
 Consider using the keyvalue pipe to be able to iterate it with 'ngFor' or @for().
 So far try to render only keys. Those keys should be the name of failed validator functions.
9. Now we have to create some map where we will be storing messages. For now, let's create it right 
in the component as an additional class property. Like `errorMessages = { required: 'This is required field', ...same for others }`.

10. Map error massages with error keys and display the actual validation error messages. 
If typescript complains, add the type `{ [key: string]: string }` for the `errorMessages` property.

### Block 3 - Applying the new solution globally
11. Apply the `validationErrorTracker` directive to form controls in `reactive-forms-page.component.html`
and remove currently existing ngIfs error messages.
12. You might probably find it inconvenient to apply every time directive. Try to think
how could we modify the selector of the `validationErrorTracker` directive to
make it magically hook-up to each formControlName directive in the template without explicitely declare `validationErrorTracker`
13. Import the `ValidationErrorTrackerDirective` also in the `RatingPickerPageComponent`
and make sure that the validation messages magically work also there!

### Block 4 - Make error messages more customizeable

14. Currently, our messages are hardcoded in the `ErrorsListComponent` which is not flexible at all. What if we want to replace
error message for some certain form? Try to use InjectionToken and Angular DI to make it more flexible. InjectionToken is created
under the `core/dynamic-validation-errors/error-messages.token.ts`.
15. Now try to override the message for the `required` validator for the `RatingPickerPageComponent`.

### Block 5 - Display errors on certain conditions

16. Currently, the errors appear immediately. However, we want to control it somehow. We can deligate
this logic to a separate class or service. You can use a dedicated service `error-display-strategy.service.ts`.
Add logic into `isErrorVisible` which defines when to hide or show error message. After that,
inject that the service into `ValidationErrorTrackerDirective` and use the `isErrorVisible()`
instead of hardcoded logic in the `subscribe()`.

Try to extract (make form optional)
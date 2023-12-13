import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appErrorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  // pipes are much better place for data transformations, reshaping
  // and resolving data based on different keys.
  // Just move inside `transform` method the logic of error message resolution
  // which you did in errors-list component (including injection of ERROR_MESSAGES token)
  transform(value: string): unknown {
    // do also an additional check if the provided key has a corresponding
    // error message in ERROR_MESSAGES object. If now, log the warning/error
    // to be notified about a missed error message.
    return value;
  }
}

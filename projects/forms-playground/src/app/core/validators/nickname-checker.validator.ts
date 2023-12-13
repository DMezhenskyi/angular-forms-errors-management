import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NicknameCheckerValidator implements AsyncValidator {
  #http = inject(HttpClient);

  validate(control: AbstractControl<string | null>): Observable<ValidationErrors | null> {
    return this.#http.get<unknown[]>(`https://jsonplaceholder.typicode.com/users?username=${control.value}`).pipe(
      map(users =>
        users.length === 0
          ? null
          : { uniqueName: { isTaken: true } }
      ),
      catchError(() => of({ uniqueName: { unknownError: true } }))
    )
  }

}

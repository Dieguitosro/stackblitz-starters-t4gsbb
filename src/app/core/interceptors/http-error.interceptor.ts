import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderSpinnerService } from '../services/loader-spinner.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(public loaderSpinnerService: LoaderSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.count++;
    if (this.count === 1) {
      this.loaderSpinnerService.show();
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
          console.log('client-side ', errorMessage);
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          if (error.status > 500) {
            window.alert(errorMessage);
          }
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.loaderSpinnerService.hide();
        }
      })
    );
  }
}

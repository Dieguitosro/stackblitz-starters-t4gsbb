/*eslint max-len: [2, 160, 4]*/ // maximum length of 160 characters
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  constructor(private readonly http: HttpClient) { }

  /**
   * Method to delete data
   *
   * @param route route
   * @param params additional HttpParams
   * @returns
   */
  delete<T>(route: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(
      this.createCompleteRoute(route, environment.baseUrl)
    );
  }


  /**
   * Method to get data
   * Parameter {string} route
   * Parameter {HttpParams} params - Additional HttpParams
   */
  public get<T>(route: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(
      this.createCompleteRoute(route, environment.baseUrl)
    );
  }

  /**
   * Method to post data
   * Parameter {string} route
   * Parameter {T} body
   * Parameter {HttpParams} params - Additional HttpParams
   */
  public post<T>(route: string, body: T, params?: HttpParams): Observable<T> {
    return this.http.post<T>(
      this.createCompleteRoute(route, environment.baseUrl),
      body
    );
  }

  /**
   * Method to update data
   * Parameter {string} route
   * Parameter {T} body
   * Parameter {HttpParams} params - Additional HttpParams
   */
  public put<T>(route: string, body: T, params?: HttpParams): Observable<T> {
    return this.http.put<T>(
      this.createCompleteRoute(route, environment.baseUrl),
      body
    );
  }

  /**
   * Method to create complete route
   * Parameter {string} route // api url controller
   * Parameter {string} envAddress // base url
   */
  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}${route}`;
  }

  /**
   * Method to replace param to value
   * Parameter {string} urlApi
   * Parameter {string} param param to change in url
   * Parameter {any} value variable to change
   * Returns {string} url with idPolicy
   */
  public replaceUrl(urlApi: string, param: string, value: any): string {
    return urlApi.replace(param, String(value));
  }


  /**
   * Method to emit error message according to HttpStatus
   * Parameter {HttpErrorResponse} error
   */
  public throwErrorApi(error: HttpErrorResponse) {
    let errorApi = [];
    if (error.error) {
      if (error.status === 500) {
        errorApi.push(error.error);
      } else if (error.status < 500 && error.status >= 400) {
        if (error.error.errors.length > 0) {
          errorApi = error.error.errors;
        } else {
          errorApi.push({ message: error.error.statusText });
        }
      } else if (error.status === 0) {
        errorApi.push(error);
      } else {
        errorApi = error.error.errors;
      }
    }
    return errorApi;
  }

}

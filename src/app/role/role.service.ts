import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {CustomResponse} from "../custom-response";
import {Role} from "./role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly apiURL = environment.api + '/roles';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(size = 0, page = 0): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(this.apiURL, {
      params: {
        size: `${size}`,
        page: `${size}`,
      }
    })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(item: Role): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(this.apiURL, item, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  find(id: number | undefined): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(this.apiURL + '/' + id)
      .pipe(catchError(this.errorHandler))
  }

  update(id: number | undefined, role: Role): Observable<CustomResponse> {
    return this.httpClient.put<CustomResponse>(this.apiURL + '/' + id, role, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  delete(id: number): Observable<CustomResponse> {
    return this.httpClient.delete<CustomResponse>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }


  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

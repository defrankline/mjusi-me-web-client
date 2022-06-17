import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {CustomResponse} from "../custom-response";
import {DataCollection, UserTrainingCreateDto} from "./data-collection";

@Injectable({
  providedIn: 'root'
})
export class DataCollectionService {
  private readonly apiURL = environment.api + '/dataCollection';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(size = 0, page = 0, query = ''): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(this.apiURL, {
      params: {
        size: `${size}`,
        page: `${page}`,
        query: `${query}`,
      }
    })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  report(): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(this.apiURL+'/report')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(data: UserTrainingCreateDto): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(this.apiURL, data, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  find(id: number | undefined): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(this.apiURL + '/' + id)
      .pipe(catchError(this.errorHandler))
  }

  update(id: number | undefined, dataCollection: UserTrainingCreateDto): Observable<CustomResponse> {
    return this.httpClient.put<CustomResponse>(this.apiURL + '/' + id, dataCollection, this.httpOptions)
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

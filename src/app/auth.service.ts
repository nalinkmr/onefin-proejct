import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  public getUserAuthentication(postdata: any): Observable<any> {
    const url = environment.apiLoginUrl;
    return this.http.post<any>(url, postdata).pipe(
      map(data => data),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  // for checking token is present is or not
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  // to fetch token from the localStorage
  getToken(){
    return localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error) {
      // Handle it accordingly.
      console.error('An error occurred:', error.error.is_success);
    } 
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}

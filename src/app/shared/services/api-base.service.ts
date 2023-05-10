import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '@environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiBaseService {



  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json' ,
        //'Authorization': localStorage.getItem('token') || ''
        'Authorization': sessionStorage.getItem('token') || ''

      },
    )
  };

  constructor(private http: HttpClient) {
    //console.log('localStorage =>', localStorage.getItem('token'))
  }

  post<T>(path: string, body: object): Observable<T> {
    return this.http.post<T>(BASE_URL + path, body, this.httpOptions);
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(BASE_URL + path, this.httpOptions);
  }

  put<T>(path: string, body: object): Observable<T> {
    return this.http.put<T>(BASE_URL + path, body, this.httpOptions);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(BASE_URL + path, this.httpOptions);
  }

}

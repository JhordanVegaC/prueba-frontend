import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL_SECURITY } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      },
    )
  };

  autenticar(body: object): Observable<any> {
    return this.http.post(BASE_URL_SECURITY + '/login', body, {observe: 'response'})
      .pipe(map(res => {
        //console.log("HttpResponse  =>", res)

        //console.log("headers =>" + JSON.stringify(res));

        const token = res.headers.get("authorization") || "";

        //console.log("authorization =>", token);

        //return res;

        return token;
      }));
  }
}

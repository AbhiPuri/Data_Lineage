import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilterApiService {
  private apiUrl = 'http://localhost:3000/api/data'; // Replace with your API URL
  //private apiUrl = 'http://localhost:3000/api/data'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getData(sqlQuery: string): Observable<any> {
    //return this.http.get(this.apiUrl);
    const queryParams = { sqlQuery };
    return this.http.get(this.apiUrl, { params: queryParams });
  }
}

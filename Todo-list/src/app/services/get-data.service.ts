import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { list } from '../models/list';

const API_URL = 'http://localhost:8085/list/todo/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http : HttpClient) { }

  getMyLists(email : any): Observable<any> {
    
    return this.http.get<Array<list>>(API_URL+'getmylist');
  }

  getAll(): Observable<any> {

    return this.http.get<Array<list>>(API_URL+'getAll',httpOptions);
  }
}

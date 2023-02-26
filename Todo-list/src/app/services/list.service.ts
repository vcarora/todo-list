import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const LIST_API = 'http://localhost:8085/list/todo/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http : HttpClient, private token : TokenStorageService) { }

  email : any = this.token.getEmail();

  create(list_name: any,description:any,admin : any){  
    return this.http.post(LIST_API+"newList/",{list_name,description,admin},httpOptions)
  }

  deleteList(id : any): Observable<any>{
    return this.http.delete(LIST_API+'deleteList/'+id,httpOptions)
  }
  deleteListItem(id: any,item: any): Observable<any>{
    return this.http.delete(LIST_API+'delete/'+id+'/'+item?.name,httpOptions)
  }

  edit(id : any,list_name: any,description: any){
    console.log(id)
    return this.http.put(LIST_API+'update/'+id,{list_name,description},httpOptions)
  }

  addItem(id: any, item: any): Observable<any>{
    return this.http.post(LIST_API+'addItem/'+id,item)
  }
}


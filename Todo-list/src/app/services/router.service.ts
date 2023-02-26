import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { list } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private router : Router) { }

  toDashboard(){
    this.router.navigate(['dashboard'])
  }

  toLogin(){
    this.router.navigate(['login'])
  }
  
  toRegister(){
    this.router.navigate(['register'])
  }

  toHome(){
    this.router.navigate(['home'])
  }

  toEdit(list? : list){
    this.router.navigateByUrl(`edit/${list?.id}`,{state:{list:list}});

  }
}

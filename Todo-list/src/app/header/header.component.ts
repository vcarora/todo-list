import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { RouterService } from '../services/router.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn = false;
   constructor(private token : TokenStorageService, private route : RouterService,private loginService : LoginService){}

   loginStatus : boolean = false

   ngOnInit() : void{
    let user = this.token.getToken();
    if(user){
      console.log(user)
      this.isLoggedIn = true;
    }else 
    this.isLoggedIn =false

    this.loginService.loginStatus.subscribe( (staus)=>{
      this.isLoggedIn = staus
    })
  } 

  logout(): void{
    this.token.logOut()
    this.isLoggedIn = false
    window.location.reload();

  }

  login():void{
    this.route.toLogin()
  }


}

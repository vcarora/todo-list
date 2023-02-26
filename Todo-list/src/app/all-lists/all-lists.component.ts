import { Component } from '@angular/core';
import { list } from '../models/list';
import { GetDataService } from '../services/get-data.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css']
})
export class AllListsComponent {
  lists : list[] =[]

  constructor(private token : TokenStorageService,
    private getData : GetDataService){}

    email : any = this.token.getEmail()

    ngOnInit(){
      if( window.localStorage )
    {
      if( !localStorage.getItem('firstLoad') )
      {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }  
      else
        localStorage.removeItem('firstLoad');
    }
      
      this.getData.getAll().subscribe({
        next: data =>{
          this.lists = data
          console.log(data)
        },error : err=>{
          alert("Failed to Load data")
        }
      })   
    }
  



}

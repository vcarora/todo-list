import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { list } from '../models/list';
import { GetDataService } from '../services/get-data.service';
import { ListService } from '../services/list.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  lists : list[] =[]

  constructor(private fb : FormBuilder, private add : ListService,
    private snackBar : MatSnackBar,private token : TokenStorageService,
    private getData : GetDataService){}

    email : any = this.token.getEmail()

    ngOnInit(){

      this.mylists()
         
    }
  

  listForm = this.fb.group({
    title : ['',[Validators.required,Validators.minLength(5)]],
    description : ['',[Validators.required]]

  })

  get title(){return this.listForm.get('title')}
  get description(){return this.listForm.get('description')}
  

  createList() : void { 
    this.add.create(this.listForm.value.title,this.listForm.value.description,this.email).subscribe({
      next: data=>{
        //console.log(data)
        this.snackBar.open('List Created Successfully', 'OK', {
          duration: 3000
        });       
      } })

      setTimeout(()=>{
        this.listForm.reset()
      },2000)
   
    this.mylists()
     

  }

  mylists(){
    this.getData.getMyLists(this.email).subscribe({
      next: data =>{
        this.lists = data
        console.log(data)
      },error : err=>{
        alert("Failed to Load data")
      }
    })
  }

  

}
 

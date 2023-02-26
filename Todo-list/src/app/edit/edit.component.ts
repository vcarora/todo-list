import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListService } from '../services/list.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  constructor(private fb : FormBuilder, private listEdit : ListService,
    private snackBar: MatSnackBar, private route : RouterService){}

    listData = history.state.list;

    editContent = this.fb.group({
      title : [`${this.listData?.list_name}`,[Validators.required,Validators.minLength(5)]],
      description : [`${this.listData?.description}`,[Validators.required]]
  
    })
  
    get title(){return this.editContent.get('title')}
    get description(){return this.editContent.get('description')}
  
    ngOnInit(){
      console.log()
    }
  
    edit(){  
      let title = this.editContent.value.title
      let desc = this.editContent.value.description
      // console.log(title)
  
       this.listEdit.edit(this.listData?.id,title,desc).subscribe({
        next: data=>{
          console.log(`data: ${data}`)
          this.snackBar.open('List Updated Successfully', 'OK', {
            duration: 3000
          });
          this.route.toDashboard();
        }
       })
  
    }
  
  }
  

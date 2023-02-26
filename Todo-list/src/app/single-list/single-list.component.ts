import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { itemList, list } from '../models/list';
import { ListService } from '../services/list.service';
import { RouterService } from '../services/router.service';
import { TokenStorageService } from '../services/token-storage.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-single-list',
  templateUrl: './single-list.component.html',
  styleUrls: ['./single-list.component.css']
})
export class SingleListComponent {

  constructor(private crud : ListService, private token_Store : TokenStorageService,private route: RouterService){}

  email : string|null = this.token_Store.getEmail()

  visible : boolean = true;


  @Input()
  list?: list ={}

  hide : boolean = true;

  ngOnInit(){

    if(this.email == this.list?.admin)
    this.hide = false
    else
    this.hide = true

  }

  edit(list : any) {
  //  console.log(list)
       this.route.toEdit(list)   
  }

  delete(list : any){
   let userSelection =  confirm('The List will get deleted.\n It cannot be restored again')
   if(userSelection){
    this.crud.deleteList(list?.id).subscribe(
      response =>{
        console.log("deleted")
        window.location.reload()

      })
    }    
  }

  deleteItem(list: any,item : any){
    console.log(item)
    let userSelection =  confirm('The item will get deleted.\n It cannot be restored again')
    if(userSelection){
     this.crud.deleteListItem(list?.id, item).subscribe(
       response =>{
         console.log("deleted")
         window.location.reload()
 
       })
     }    
   }
  formItem : itemList = {}

  addItem(id: any,item : any){
      this.crud.addItem(id,item.value).subscribe({
      next : data=>{
       // console.log(data)
       window.location.reload()     

      }
    })

    this.appear()
  }

  appear(){
    this.visible = !this.visible
  }

  taskCompleted(item: any){
    console.log(item)

  }

  @ViewChild('screen')
  screen!: ElementRef;
  @ViewChild('canvas')
  canvas!: ElementRef;
  @ViewChild('downloadLink')
  downloadLink!: ElementRef;

  share(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
     this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'my-todo-list.png';
      this.downloadLink.nativeElement.click();
    });
    
    
  }




}

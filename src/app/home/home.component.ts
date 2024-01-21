import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  date: Date[] | undefined;

  ngOnInit() {
    
  }

  execDate(event:any){

    console.log("SELECTED DATE::: " + this.date);

  }

}

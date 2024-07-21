import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  //title = 'enset-app';
  actions: Array<any>=[
    {title: "Home", "route":"/home", icon: "house"},
    {title: "Products", "route":"/products", icon: "search"},
    {title: "new Products", "route":"/newProducts", icon: "safe"},
  ]
  currentAction: any;

  setCUrrentAction(action: any) {
   this.currentAction=action
    }
}

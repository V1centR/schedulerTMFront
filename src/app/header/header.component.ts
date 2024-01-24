import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  items:any;
  

  ngOnInit() {
    this.items = [
        { label: 'Home', icon: 'pi pi-fw pi-home',routerLink:'/' },
        { label: 'Registrar', icon: 'pi pi-fw pi-calendar',routerLink:'/register' },
        { label: 'Graphics', icon: 'pi pi-fw pi-pencil',routerLink:'/graphics' },
        { label: 'Reports', icon: 'pi pi-fw pi-file' },
        { label: 'Help!', icon: 'pi pi-fw pi-cog',routerLink:'/info' }
    ];
}

}

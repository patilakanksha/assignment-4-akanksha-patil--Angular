import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public userName = localStorage.getItem('userName');

  constructor(private router: Router) { }

  public logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}

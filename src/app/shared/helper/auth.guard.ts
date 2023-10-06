import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private authService: AuthService,
    private route: Router) {
  }

  canActivate() {
    // let isUserLoggedIn = localStorage.getItem('userName')!== null;
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
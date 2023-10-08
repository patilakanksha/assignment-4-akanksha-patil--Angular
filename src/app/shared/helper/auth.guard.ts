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


// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean | UrlTree {
//     const isAuthenticated = this.checkAuthentication();

//     if (isAuthenticated) {
//       // Renew the session timeout
//       this.renewSessionTimeout();
//       return true;
//     } else {
//       // Redirect to the login page if not authenticated
//       return this.router.createUrlTree(['/login']);
//     }
//   }

//   private checkAuthentication(): boolean {
//     // Check if user credentials are present in local storage
//     const userName = localStorage.getItem('userName');
//     return !!userName;
//   }

//   private renewSessionTimeout(): void {
//     // Set or renew the session timeout when the user is active
//     const timeoutDuration = 30000; // 5 minutes in milliseconds
//     const lastActivityTime = localStorage.getItem('lastActivityTime');

//     if (lastActivityTime) {
//       const currentTime = new Date().getTime();
//       const lastActivity = new Date(lastActivityTime).getTime();

//       if (currentTime - lastActivity >= timeoutDuration) {
//         // Session timed out, log the user out
//         this.logout();
//         console.log("logout successfully")
//       } else {
//         // Update the last activity time
//         localStorage.setItem('lastActivityTime', currentTime.toString());
//         console.log('lastActivityTime', currentTime.toString())
//       }
//     } else {
//       // Initialize the last activity time
//       console.log('lastActivityTime', new Date().getTime().toString())
//       localStorage.setItem('lastActivityTime', new Date().getTime().toString());
//     }
//   }

//   private logout(): void {
//     // Clear user credentials and redirect to login page
  
//     localStorage.removeItem('userName');
//     localStorage.removeItem('lastActivityTime');
//     this.router.navigate(['/login']);
//   }
// }
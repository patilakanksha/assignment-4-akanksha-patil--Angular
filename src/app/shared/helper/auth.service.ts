import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() { }

  isLoggedIn() {
    return localStorage.getItem('userName') != null;
  }

  isLogOut() {
    (localStorage.getItem('userName') === null) ? true : false
  }
}
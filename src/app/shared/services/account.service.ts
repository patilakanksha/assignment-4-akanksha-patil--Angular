import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(): any{
    return this.httpClient.get('http://localhost:8000/users')
  }
}

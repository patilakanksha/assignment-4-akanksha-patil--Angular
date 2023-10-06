import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl()
  })
  constructor(private accountService: AccountService,
    private toastrService: ToastrService,
    private router: Router) {
  }

  ngOnInit() {
    localStorage.removeItem('userName');
  }

  public login(): void {
    let userName: any = this.loginForm.get('userName')?.value;
    let password: any = this.loginForm.get('password')?.value;
    this.accountService.getUsers().subscribe((response: any[]) => {
      let userIndex = response.findIndex((user) => user.userName.toLowerCase() === userName?.toLowerCase() &&
        user.password === password)
      if (userIndex != -1) {
        localStorage.setItem("userName", userName?.toLowerCase());
        this.toastrService.success('User logged in successsfully', 'Success')
        this.router.navigate(['/dashboard'])
      }
      else {
        this.toastrService.error('Invalid Username or Password', 'Error')
      }
    }, () => {
      this.toastrService.error('Error in loading users list', 'Error')
    })

  }
}

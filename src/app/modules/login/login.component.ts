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

    // Set a timeout of 5 minutes (300,000 milliseconds)
  const timeoutDuration = 1000;

  // Create a timer to perform actions after the timeout
  const timeoutTimer = setTimeout(() => {
    // This code will be executed after the timeout (5 minutes)
    this.toastrService.warning('Session timed out', 'Timeout');
    // You can add any additional logic here, such as logging the user out or resetting the form.
  }, timeoutDuration);

    this.accountService.getUsers().subscribe((response: any[]) => {
      let userIndex = response.findIndex((user) => user.userName.toLowerCase() === userName?.toLowerCase() &&
        user.password === password)
        clearTimeout(timeoutTimer);
      if (userIndex != -1) {
        localStorage.setItem("userName", userName?.toLowerCase());
        this.toastrService.success('User logged in successsfully', 'Success')
        this.router.navigate(['/dashboard'])
      }
      else {
        this.toastrService.error('Invalid Username or Password', 'Error')
      }
    }, () => {
      clearTimeout(timeoutTimer); // Clear the timeout in case of an error
      this.toastrService.error('Error in loading users list', 'Error');
    })

  }
}

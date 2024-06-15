import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showToast = false;
  toastMessage = 'This is a toast notification';
  toastType: 'success' | 'error' = 'success';

  displayToast(message: string, type: 'success' | 'error', duration: number = 3000) {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, duration);
  }
  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', Validators.required)
  })
  constructor(private usersService: UsersService, public router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }
     
  onSubmit() {
    var loginJson = JSON.stringify(this.form.value);
    this.usersService.loginCheck(loginJson)
    .subscribe((data => {
      if(data == true){
        this.displayToast("Login successful","success");
        var jsonData = JSON.parse(loginJson);
        this.storeLogin(jsonData['email']);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.displayToast("Invalid Login","error"); 
      }
    }))
  }

  storeLogin(email){
    sessionStorage.setItem("email", email); 
  }
  checkLogin(){
    if (sessionStorage.length != 0){
      this.router.navigate(['/']);
    }
  }
}

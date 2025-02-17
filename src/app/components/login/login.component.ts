import { GlobalService } from './../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userData: any = {};
  isSubmitted = false
  constructor(private router: Router,private ToastrService:ToastrService,private GlobalService:GlobalService){
    let userAppData = localStorage.getItem("userAppData") || null;
    if (userAppData) {
      this.userData = JSON.parse(userAppData)
      console.log("userAppData", this.userData);
    }else{
      this.userData = null
    }
  }
  loginForm = new FormGroup({
    emailOrPhone: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required])
  });
  login(){
    this.isSubmitted = true;
   if(this.loginForm.valid){
    console.log(this.userData)
    if (this.userData) {
      if (this.loginForm.value.emailOrPhone == this.userData.userData.email || this.loginForm.value.emailOrPhone == this.userData.userData.phone) {
        if (this.loginForm.value.password == this.userData.userData.password) {
          localStorage.setItem("userLoginToken", JSON.stringify(this.userData.UserToken));
          this.router.navigate(["/home"]);
          this.ToastrService.success("Login Successfully");
          this.GlobalService.isLogin.next(true);
          this.GlobalService.userData.next(this.userData);
          this.isSubmitted = false;
          this.loginForm.reset();
        }else{
          this.ToastrService.info("Please enter correct Email/Phone and Password");
        }

      }else{
        this.ToastrService.info("Please enter correct Email/Phone and Password");
      }

  }else{
    this.ToastrService.info("Please register first");
    this.router.navigate(["/register"]);
  }


    }
  }
  }


import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isSubmitted = false
  registerForm = new FormGroup({
    name: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required]),
    phone: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })
  constructor(private Router:Router,private ToastrService:ToastrService){}
  register(){
    this.isSubmitted = true
    // console.log(this.registerForm.value);
    // console.log("clicked");
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      let data = {
        userData: this.registerForm.value,
        UserToken :Date.now()

      }
      localStorage.setItem("userAppData", JSON.stringify(data));
      this.Router.navigate(["/login"]);
      this.isSubmitted = false;
      this.registerForm.reset();
      this.ToastrService.success("Registered Successfully");

    }
  }
}

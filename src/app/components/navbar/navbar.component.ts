import { GlobalService } from './../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin = false;
  userData: any;
  constructor(private Router:Router,private ToastrService:ToastrService,private GlobalService:GlobalService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let userAppData = localStorage.getItem("userAppData") || null;
    if (userAppData) {
      this.userData = JSON.parse(userAppData)
      console.log("userAppData", this.userData);
      this.GlobalService.isLogin.next(true);
      this.GlobalService.isLogin$.subscribe(data => {this.isLogin = data})
    }
  }
  logout() {
    localStorage.removeItem("userAppData");
    localStorage.removeItem("userLoginToken");
    this.GlobalService.isLogin.next(false)
    this.ToastrService.success("Logout Successfully");
    this.Router.navigate(["/login"]);

  }
}

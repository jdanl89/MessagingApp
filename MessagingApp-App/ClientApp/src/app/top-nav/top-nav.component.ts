import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";
import { User } from "../_models/user";

@Component({
  selector: "app-top-nav",
  templateUrl: "./top-nav.component.html",
  styleUrls: ["./top-nav.component.css"]
})
export class TopNavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    //this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(() => {
        this.alertify.success("logged in successfully");
      },
      () => {
        this.alertify.error("Failed to log in");
      },
      () => {
        this.router.navigate(["/home"]);
      });
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null as User;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.alertify.message("logged out");
    this.router.navigate(["/home"]);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}

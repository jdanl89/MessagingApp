import { Component } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  model: any = {};

  constructor(public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) {
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

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }
}

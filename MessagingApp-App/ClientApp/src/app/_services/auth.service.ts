import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { AuthUser } from "../_models/authUser";
import { User } from "../_models/user";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertifyService } from "../_services/alertify.service";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  baseUrl = environment.apiUrl;
  userToken: any;
  decodedToken: any;
  currentUser: User;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': `Bearer ${this.jwtHelperService.tokenGetter()}`
    })
  }

  constructor(private alertify: AlertifyService,
    private router: Router,
    private authHttp: HttpClient,
    private jwtHelperService: JwtHelperService) { }

  login(model: any) {
    return this.authHttp.post<AuthUser>(this.baseUrl + "auth/login", model, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
    })
      .map(user => {
        if (user) {
          localStorage.setItem("token", user.tokenString);
          localStorage.setItem("user", JSON.stringify(user.user));
          this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
          this.currentUser = user.user;
          this.userToken = user.tokenString;
        }
      }
      );
  }

  register(user: User) {
    return this.authHttp.post(this.baseUrl + "auth/register",
      user,
      {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      });
  }

  changePassword(model: any) {
    return this.authHttp
      .put<AuthUser>(this.baseUrl + "auth/changePassword", model, { headers: this.httpOptions.headers })
      .map(user => {
        if (user) {
          localStorage.setItem("token", user.tokenString);
          localStorage.setItem("user", JSON.stringify(user.user));
          this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
          this.currentUser = user.user;
          this.userToken = user.tokenString;
        }
      }
      );
  }

  loggedIn() {
    const token = this.jwtHelperService.tokenGetter();

    if (!token) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(token);
  }

}

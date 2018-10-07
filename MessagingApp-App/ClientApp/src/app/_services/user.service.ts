import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { User } from "../_models/user";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': `Bearer ${this.jwtHelperService.tokenGetter()}`
    })
  }

  constructor(private authHttp: HttpClient, private jwtHelperService: JwtHelperService) { }

  getUsers(): Observable<User[]> {
    return this.authHttp
      .get<User[]>(this.baseUrl + "users", { headers: this.httpOptions.headers });
  }

  listUsers(): Observable<User[]> {
    return this.authHttp
      .get<User[]>(this.baseUrl + "users/list", { headers: this.httpOptions.headers });
  }

  getUser(id): Observable<User> {
    return this.authHttp
      .get<User>(this.baseUrl + "users/" + id, { headers: this.httpOptions.headers });
  }

  updateUser(id: number, user: User) {
    return this.authHttp
      .put(this.baseUrl + "users/" + id, user, { headers: this.httpOptions.headers });
  }
}

import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { Message } from "../_models/message";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class MessageService {
  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': `Bearer ${this.jwtHelperService.tokenGetter()}`
    })
  }
  private photoUrl = new BehaviorSubject<string>("../../assets/user.png");
  messagePhotoUrl = this.photoUrl.asObservable();

  constructor(private authHttp: HttpClient, private jwtHelperService: JwtHelperService) { }

  getMessages() {
    let params = new HttpParams;

    return this.authHttp
      .get<Message[]>(this.baseUrl + "messages", { headers: this.httpOptions.headers, params });
  }

  listMessages() {
    let params = new HttpParams;

    return this.authHttp
      .get<Message[]>(this.baseUrl + "messages/list", { headers: this.httpOptions.headers, params });
  }

  getMessage(id): Observable<Message> {
    return this.authHttp
      .get<Message>(this.baseUrl + "messages/" + id, { headers: this.httpOptions.headers });
  }

  updateMessage(id: number, message: Message) {
    return this.authHttp
      .put(this.baseUrl + "messages/" + id, message, { headers: this.httpOptions.headers });
  }

  createMessage(message: Message) {
    return this.authHttp.post(this.baseUrl + "messages", message, { headers: this.httpOptions.headers });
  }

  deleteMessage(id: number) {
    return this.authHttp.delete(this.baseUrl + "messages/" + id, { headers: this.httpOptions.headers });
  }
}

import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { Conversation } from "../_models/conversation";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class ConversationService {
  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': `Bearer ${this.jwtHelperService.tokenGetter()}`
    })
  }
  private photoUrl = new BehaviorSubject<string>("../../assets/user.png");
  conversationPhotoUrl = this.photoUrl.asObservable();

  constructor(private authHttp: HttpClient, private jwtHelperService: JwtHelperService) { }

  getConversations() {
    let params = new HttpParams;

    return this.authHttp
      .get<Conversation[]>(this.baseUrl + "conversations", { headers: this.httpOptions.headers, params });
  }

  listConversations() {
    let params = new HttpParams;

    return this.authHttp
      .get<Conversation[]>(this.baseUrl + "conversations/list", { headers: this.httpOptions.headers, params });
  }

  getConversation(id): Observable<Conversation> {
    return this.authHttp
      .get<Conversation>(this.baseUrl + "conversations/" + id, { headers: this.httpOptions.headers });
  }

  updateConversation(id: number, conversation: Conversation) {
    return this.authHttp
      .put(this.baseUrl + "conversations/" + id, conversation, { headers: this.httpOptions.headers });
  }

  createConversation(conversation: Conversation) {
    return this.authHttp.post(this.baseUrl + "conversations", conversation, { headers: this.httpOptions.headers });
  }

  deleteConversation(id: number) {
    return this.authHttp.delete(this.baseUrl + "conversations/" + id, { headers: this.httpOptions.headers });
  }
}

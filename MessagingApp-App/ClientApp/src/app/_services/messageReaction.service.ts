import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { MessageReaction } from "../_models/messageReaction";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class MessageReactionService {
  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': `Bearer ${this.jwtHelperService.tokenGetter()}`
    })
  }
  private photoUrl = new BehaviorSubject<string>("../../assets/user.png");
  messageReactionPhotoUrl = this.photoUrl.asObservable();

  constructor(private authHttp: HttpClient, private jwtHelperService: JwtHelperService) { }

  getMessageReactions() {
    let params = new HttpParams;

    return this.authHttp
      .get<MessageReaction[]>(this.baseUrl + "messageReactions", { headers: this.httpOptions.headers, params });
  }

  listMessageReactions() {
    let params = new HttpParams;

    return this.authHttp
      .get<MessageReaction[]>(this.baseUrl + "messageReactions/list", { headers: this.httpOptions.headers, params });
  }

  getMessageReaction(id): Observable<MessageReaction> {
    return this.authHttp
      .get<MessageReaction>(this.baseUrl + "messageReactions/" + id, { headers: this.httpOptions.headers });
  }

  updateMessageReaction(messageReaction: MessageReaction) {
    return this.authHttp
      .put(this.baseUrl + "messageReactions", messageReaction, { headers: this.httpOptions.headers });
  }

  createMessageReaction(messageReaction: MessageReaction) {
    return this.authHttp.post(this.baseUrl + "messageReactions",
      messageReaction,
      { headers: this.httpOptions.headers });
  }

  deleteMessageReaction(messageId: number) {
    return this.authHttp.delete(
      this.baseUrl + "messageReactions/" + messageId,
      { headers: this.httpOptions.headers });
  }
}

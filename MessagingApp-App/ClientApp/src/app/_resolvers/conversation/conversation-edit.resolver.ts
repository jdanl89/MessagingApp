import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Conversation } from "../../_models/conversation";
import { Injectable } from "@angular/core";
import { ConversationService } from "../../_services/conversation.service";
import { AlertifyService } from "../../_services/alertify.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import { AuthService } from "../../_services/auth.service";

@Injectable()
export class ConversationEditResolver implements Resolve<Conversation> {

  constructor(private conversationService: ConversationService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Conversation> {
    return this.conversationService.getConversation(this.authService.decodedToken.nameid).catch(error => {
      this.alertify.error("Problem retrieving data");
      this.router.navigate(["/conversations"]);
      return Observable.of(null);
    });
  }
}

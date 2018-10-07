import { Component, OnInit } from "@angular/core";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { ConversationService } from "../_services/conversation.service";
import { Router } from "@angular/router";
import { Conversation } from "../_models/conversation";
import { User } from "../_models/user";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user")) as User;
  conversations = [] as Conversation[];
  isExpanded: boolean = false;
  creatingConversation: boolean = false;

  constructor(public alertify: AlertifyService,
    public authService: AuthService,
    public conversationService: ConversationService,
    public router: Router) { }

  ngOnInit() {
    this.getConversations();

    this.router.events.subscribe(
      () => {
        if (!this.creatingConversation && this.router.url === "/conversations/create") {
          this.creatingConversation = true;
        } else if (this.creatingConversation && this.router.url !== "/conversations/create") {
          this.getConversations();
          this.creatingConversation = false;
        }
      }
    );
  }

  getConversations() {
    this.conversationService.listConversations().subscribe(
      (res: Conversation[]) => {
        this.conversations = res;
        this.conversations = this.conversations.sort((a, b) => { return a.lastUpdated > b.lastUpdated ? 1 : b.lastUpdated > a.lastUpdated ? -1 : 0 });
        this.conversations.forEach(conversation => conversation.users.sort((a) => { return a.username === this.user.username ? 1 : -1}));
      },
      () => {
        this.alertify.error("Failed to load conversations");
      }
    );
  }

  deleteConversation(conversation: Conversation) {
    this.conversationService.deleteConversation(conversation.id).subscribe(
      () => {
        for (var i = 0; i < this.conversations.length; i++) {
          if (this.conversations[i].id === conversation.id) {
            this.conversations.splice(i, 1);
            break;
          }
        }

        this.alertify.success("Conversation deleted successfully");
      },
      () => {
        this.alertify.error("Failed to delete conversation");
      }
    );
  }
  
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  collapse() {
    this.isExpanded = false;
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null as User;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.alertify.message("logged out");
    this.router.navigate(["/home"]);
  }
}

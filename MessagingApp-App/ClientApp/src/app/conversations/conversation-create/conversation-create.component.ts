import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Conversation } from "../../_models/conversation";
import { User } from "../../_models/user";
import { AlertifyService } from "../../_services/alertify.service";
import { AuthService } from "../../_services/auth.service";
import { ConversationService } from "../../_services/conversation.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-conversation-create",
  templateUrl: "./conversation-create.component.html",
  styleUrls: ["./conversation-create.component.css"]
})
export class ConversationCreateComponent implements OnInit {
  ready: boolean = false;

  user = JSON.parse(localStorage.getItem("user")) as User;
  users = [] as User[];
  selectedUsers = [] as User[];

  conversationForm = this.fb.group({
    users: ["", [Validators.required]]
  });

  dropdownSettings = {
    singleSelection: false,
    idField: "id",
    textField: "username",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  constructor(private authService: AuthService,
    private conversationService: ConversationService,
    private userService: UserService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router,) { }

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.userService.listUsers().subscribe(
      (res: User[]) => {
        this.users = res.filter(user => user.id !== this.user.id);
      },
      () => {
        this.alertify.error("Failed to load users");
      },
      () => {
        this.ready = true;
      }
    );
  }


  createConversation() {
    const conversation = Object.assign({}, this.conversationForm.value) as Conversation;
    this.conversationService.createConversation(conversation).subscribe(
      (res: Conversation) => {
        this.router.navigate([`conversations/${res.id}`]);
      },
      () => {
        this.alertify.error("Failed to create conversation");
      }
    );
  }
}

import { AfterViewChecked, Component, OnInit, ViewChild, NgZone, ElementRef } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Conversation } from "../../_models/conversation";
import { Message } from "../../_models/message";
import { MessageReaction } from "../../_models/messageReaction";
import { User } from "../../_models/user";
import { AlertifyService } from "../../_services/alertify.service";
import { MessageService } from "../../_services/message.service";
import { SignalRService } from "../../_services/signalR.service";

@Component({
  selector: "app-conversation-detail",
  templateUrl: "./conversation-detail.component.html",
  styleUrls: ["./conversation-detail.component.css"]
})
export class ConversationDetailComponent implements OnInit, AfterViewChecked {
  user = JSON.parse(localStorage.getItem("user")) as User;
  conversation = null as Conversation;
  messageForm = this.fb.group({
    message: ["", [Validators.required]]
  });
  canSendMessage: boolean = false;

  @ViewChild
  ("messageLog") messageLog: ElementRef;

  constructor(private alertify: AlertifyService,
    private messageService: MessageService,
    private signalRService: SignalRService,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.subscribeToEvents();
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.conversation = data["user"] as Conversation;
      },
      () => {
        this.alertify.error("Failed to load conversation");
      }
    );
  }

  ngAfterViewChecked() {
    this.messageLog.nativeElement.scrollTop = this.messageLog.nativeElement.scrollHeight;
  }

  sendMessage() {
    const newMessage: Message = {
      messageText: this.messageForm.get(["message"]).value,
      userId: this.user.id,
      user: this.user,
      conversationId: this.conversation.id,
      conversation: this.conversation
    };

    this.signalRService.sendMessage(newMessage);

    this.messageService.createMessage(newMessage).subscribe(
      () => {
        this.messageForm.reset();
      },
      () => {
        this.alertify.error("Failed to send message");
      }
    );
  }

  private subscribeToEvents(): void {
    this.signalRService.connectionEstablished.subscribe(() => { this.canSendMessage = true; });

    this.signalRService.messageReceived.subscribe((message: Message) => {
      this.ngZone.run(() => {
        this.conversation.messages.push(message);
      });
    });

    this.signalRService.messageReactionReceived.subscribe((messageReaction: MessageReaction) => {
      this.ngZone.run(() => {
        if (messageReaction.userId !== this.user.id)
          this.updateMessageReaction(messageReaction);
      });
    });
  }

  deleteMessage(id: number) {
    for (var i = 0; i < this.conversation.messages.length; i++) {
      if (this.conversation.messages[i].id === id) {
        this.conversation.messages.splice(i, 1);
        break;
      }
    }
  }

  updateMessageReaction(messageReaction: MessageReaction) {
    let message = this.conversation.messages.find(message => message.id === messageReaction.messageId);
    let existingReaction = message.messageReactions.find(mr => mr.userId === messageReaction.userId);

    if (existingReaction != null) {
      this.conversation.messages.map(message => message.messageReactions).reduce((a, b) => a.concat(b))
        .forEach((mr, i) => {
          if (mr.userId === messageReaction.userId && mr.messageId === messageReaction.messageId)
            this.conversation.messages.map(message => message.messageReactions).reduce((a, b) => a.concat(b))
              .splice(i, 1);
        });
    }

    this.conversation.messages.find(m => m.id === message.id).messageReactions.push(messageReaction);
  }
}

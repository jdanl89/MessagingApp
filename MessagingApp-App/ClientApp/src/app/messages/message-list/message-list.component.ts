import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Message } from "../../_models/message";
import { MessageReaction } from "../../_models/messageReaction";
import { User } from "../../_models/user";
import { AlertifyService } from "../../_services/alertify.service";
import { MessageService } from "../../_services/message.service";
import { MessageReactionService } from "../../_services/messageReaction.service";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {
  @Input()
  message: Message;

  @Output()
  messageDeletion = new EventEmitter();

  @Output()
  messageReaction = new EventEmitter();

  user = JSON.parse(localStorage.getItem("user")) as User;
  thisUsersReaction = null as MessageReaction;
  angryReactions = 0;
  sadReactions = 0;
  smileReactions = 0;
  laughReactions = 0;
  showMessageOptions = false;

  constructor(private alertify: AlertifyService,
    private messageService: MessageService,
    private messageReactionService: MessageReactionService) { }

  ngOnInit() {
    if (this.message != null && this.message.messageReactions != null) {
      this.thisUsersReaction = this.message.messageReactions.find(reaction => reaction.userId === this.user.id);

      this.angryReactions = this.message.messageReactions.filter(mr => mr.reaction === 1) != null
        ? this.message.messageReactions.filter(mr => mr.reaction === 1).length
        : 0;
      this.sadReactions = this.message.messageReactions.filter(mr => mr.reaction === 2) != null
        ? this.message.messageReactions.filter(mr => mr.reaction === 2).length
        : 0;
      this.smileReactions = this.message.messageReactions.filter(mr => mr.reaction === 3) != null
        ? this.message.messageReactions.filter(mr => mr.reaction === 3).length
        : 0;
      this.laughReactions = this.message.messageReactions.filter(mr => mr.reaction === 4) != null
        ? this.message.messageReactions.filter(mr => mr.reaction === 4).length
        : 0;
    }
  }

  deleteMessage() {
    this.messageService.deleteMessage(this.message.id).subscribe(
      () => { this.messageDeletion.emit(this.message.id) },
      () => { this.alertify.error("Failed to delete message") }
    );
  }

  reactToMessage(reaction: number) {
    if (this.message.userId !== this.user.id) {

      const newReaction = {
        userId: this.user.id,
        user: this.user,
        messageId: this.message.id,
        message: this.message,
        reaction: reaction
      } as MessageReaction;

      if (this.thisUsersReaction != null) {
        if (this.thisUsersReaction.reaction === reaction) {
          this.messageReactionService.deleteMessageReaction(this.message.id).subscribe(
            () => {
              switch (this.thisUsersReaction.reaction) {
                case 1:
                  this.angryReactions--;
                  break;
                case 2:
                  this.sadReactions--;
                  break;
                case 3:
                  this.smileReactions--;
                  break;
                case 4:
                  this.laughReactions--;
                  break;
              };

              this.thisUsersReaction = null;
            },
            () => {
              this.alertify.error("Failed to delete reaction");
            }
          );
        }
        this.messageReactionService.updateMessageReaction(newReaction).subscribe(
          (res: MessageReaction) => {
            switch (this.thisUsersReaction.reaction) {
              case 1:
                this.angryReactions--;
                break;
              case 2:
                this.sadReactions--;
                break;
              case 3:
                this.smileReactions--;
                break;
              case 4:
                this.laughReactions--;
                break;
            }

            switch (reaction) {
              case 1:
                this.angryReactions++;
                break;
              case 2:
                this.sadReactions++;
                break;
              case 3:
                this.smileReactions++;
                break;
              case 4:
                this.laughReactions++;
                break;
            }

            this.thisUsersReaction = res;
            this.messageReaction.emit(res);
          },
          () => {
            this.alertify.error("Failed to update reaction");
          }
        );
      } else {
        this.messageReactionService.createMessageReaction(newReaction).subscribe(
          (res: MessageReaction) => {
            switch (reaction) {
              case 1:
                this.angryReactions++;
                break;
              case 2:
                this.sadReactions++;
                break;
              case 3:
                this.smileReactions++;
                break;
              case 4:
                this.laughReactions++;
                break;
            }

            this.thisUsersReaction = res;
            this.messageReaction.emit(res);
          },
          () => {
            this.alertify.error("Failed to create reaction");
          }
        );
      }
    }
  }
}

import { EventEmitter, Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Message } from "../_models/message";
import { MessageReaction } from "../_models/messageReaction";
import { AlertifyService } from "../_services/alertify.service";

@Injectable()
export class SignalRService {
  messageReceived = new EventEmitter<Message>();
  messageReactionReceived = new EventEmitter<MessageReaction>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private hubConnection: HubConnection;

  constructor(private alertify: AlertifyService) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendMessage(message: Message) {
    try {
      this.hubConnection.invoke("SendMessage", message);
    }
    catch(err) {
      this.alertify.error("Failed to send directly to recipient");
    }
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("chathub")
      .build();
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        this.alertify.success("Connection started");
        this.connectionEstablished.emit(true);
      })
      .catch(() => {
        console.log("Error while establishing connection, retrying...");
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on("ReceiveMessage", (data: any) => {
      this.messageReceived.emit(data);
    });

    this.hubConnection.on("ReceiveMessageReaction", (data: any) => {
        this.messageReactionReceived.emit(data);
      });
  } 
}

import { Message } from "./message";
import { Reaction } from "./reaction";
import { User } from "./user";

export interface MessageReaction {
  userId?: number;
  user: User;
  messageId?: number;
  message?: Message;
  reaction?: Reaction;
  created?: Date;
  lastUpdated?: Date;
}

import { Conversation } from "./conversation";
import { Message } from "./message";
import { MessageReaction } from "./messageReaction";

export interface User {
  id?: number;
  username?: string;
  conversations?: Conversation[];
  messages?: Message[];
  messageReactions?: MessageReaction[];
  created?: Date;
  lastActive?: Date;
  lastUpdated?: Date;
}

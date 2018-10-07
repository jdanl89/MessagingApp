import { Conversation } from "./conversation";
import { MessageReaction } from "./messageReaction";
import { User } from "./user";

export interface Message {
  id?: number;
  messageText: string;
  userId?: number;
  user: User;
  conversationId?: number;
  conversation: Conversation;
  messageReactions?: MessageReaction[];
  created?: Date;
  lastUpdated?: Date;
}

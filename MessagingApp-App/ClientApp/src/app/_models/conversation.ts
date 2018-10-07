import { User } from "./user";
import { Message } from "./message";

export interface Conversation {
  id?: number;
  messages?: Message[];
  users?: User[];
  created?: Date;
  lastUpdated?: Date;
  tryDelete: Boolean;
}

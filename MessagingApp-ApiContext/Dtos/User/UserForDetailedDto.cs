using System;
using System.Collections.Generic;
using MessagingApp.ApiContext.Dtos.Conversation;
using MessagingApp.ApiContext.Dtos.Message;
using MessagingApp.ApiContext.Dtos.MessageReaction;

namespace MessagingApp.ApiContext.Dtos.User
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public ICollection<ConversationForListDto> UserConversations { get; set; }

        public ICollection<MessageForListDto> Messages { get; set; }

        public ICollection<MessageReactionForListDto> MessageReactions { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}

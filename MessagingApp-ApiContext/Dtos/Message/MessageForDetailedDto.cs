using System;
using System.Collections.Generic;
using MessagingApp.ApiContext.Dtos.Conversation;
using MessagingApp.ApiContext.Dtos.MessageReaction;
using MessagingApp.ApiContext.Dtos.User;

namespace MessagingApp.ApiContext.Dtos.Message
{
    public class MessageForDetailedDto
    {
        public int Id { get; set; }

        public string MessageText { get; set; }

        public int? UserId { get; set; }
        public UserForListDto User { get; set; }

        public int? ConversationId { get; set; }
        public ConversationForListDto Conversation { get; set; }

        public ICollection<MessageReactionForListDto> MessageReactions { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}

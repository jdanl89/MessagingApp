using System;
using System.Collections.Generic;

namespace MessagingApp.ApiContext.Models
{
    public class Message
    {
        public int Id { get; set; }

        public string MessageText { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public int? ConversationId { get; set; }
        public Conversation Conversation { get; set; }

        public ICollection<MessageReaction> MessageReactions { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}

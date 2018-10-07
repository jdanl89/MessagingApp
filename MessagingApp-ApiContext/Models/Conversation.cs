using System;
using System.Collections.Generic;

namespace MessagingApp.ApiContext.Models
{
    public class Conversation
    {
        public int Id { get; set; }

        public ICollection<UserConversation> UserConversations { get; set; }

        public ICollection<Message> Messages { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}

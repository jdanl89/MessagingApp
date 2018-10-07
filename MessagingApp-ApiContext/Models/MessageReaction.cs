using System;

namespace MessagingApp.ApiContext.Models
{
    public class MessageReaction
    {
        public int UserId { get; set; }
        public User User { get; set; }
        
        public int MessageId { get; set; }
        public Message Message { get; set; }

        public Reaction Reaction { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}

using System;
using MessagingApp.ApiContext.Dtos.Message;
using MessagingApp.ApiContext.Dtos.User;
using MessagingApp.ApiContext.Models;

namespace MessagingApp.ApiContext.Dtos.MessageReaction
{
    public class MessageReactionForDetailedDto
    {
        public int? UserId { get; set; }
        public UserForListDto User { get; set; }

        public int? MessageId { get; set; }
        public MessageForListDto Message { get; set; }

        public Reaction Reaction { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}

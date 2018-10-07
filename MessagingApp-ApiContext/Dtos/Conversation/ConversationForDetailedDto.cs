using System;
using System.Collections.Generic;
using MessagingApp.ApiContext.Dtos.Message;
using MessagingApp.ApiContext.Dtos.User;

namespace MessagingApp.ApiContext.Dtos.Conversation
{
    public class ConversationForDetailedDto
    {
        public int Id { get; set; }

        public ICollection<UserForListDto> Users { get; set; }

        public ICollection<MessageForListDto> Messages { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}

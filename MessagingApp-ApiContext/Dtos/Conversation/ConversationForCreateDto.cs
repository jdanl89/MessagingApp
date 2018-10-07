using System;
using System.Collections.Generic;
using MessagingApp.ApiContext.Dtos.User;

namespace MessagingApp.ApiContext.Dtos.Conversation
{
    public class ConversationForCreateDto
    {
        public ICollection<UserForListDto> Users { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }

        public ConversationForCreateDto()
        {
            Created = DateTime.UtcNow;
            LastUpdated = DateTime.UtcNow;
        }
    }
}

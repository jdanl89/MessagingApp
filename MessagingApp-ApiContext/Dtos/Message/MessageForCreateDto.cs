using System;
using MessagingApp.ApiContext.Dtos.Conversation;
using MessagingApp.ApiContext.Dtos.User;

namespace MessagingApp.ApiContext.Dtos.Message
{
    public class MessageForCreateDto
    {
        public string MessageText { get; set; }

        public int UserId { get; set; }
        public UserForListDto User { get; set; }

        public int ConversationId { get; set; }
        public ConversationForListDto Conversation { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }

        public MessageForCreateDto()
        {
            Created = DateTime.UtcNow;
            LastUpdated = DateTime.UtcNow;;
        }
    }
}

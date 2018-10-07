using System;
using MessagingApp.ApiContext.Dtos.Conversation;
using MessagingApp.ApiContext.Dtos.User;

namespace MessagingApp.ApiContext.Dtos.Message
{
    public class MessageForUpdateDto
    {
        public int Id { get; set; }

        public string MessageText { get; set; }

        public int? UserId { get; set; }
        public UserForListDto User { get; set; }

        public int? ConversationId { get; set; }
        public ConversationForListDto Conversation { get; set; }

        public DateTime LastUpdated { get; set; }

        public MessageForUpdateDto()
        {
            LastUpdated = DateTime.UtcNow; ;
        }
    }
}

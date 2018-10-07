using System.Collections.Generic;
using MessagingApp.ApiContext.Dtos.User;

namespace MessagingApp.ApiContext.Dtos.Conversation
{
    public class ConversationForListDto
    {
        public int Id { get; set; }

        public ICollection<UserForListDto> Users { get; set; }
    }
}

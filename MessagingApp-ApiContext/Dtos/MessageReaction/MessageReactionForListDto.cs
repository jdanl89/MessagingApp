using MessagingApp.ApiContext.Dtos.User;
using MessagingApp.ApiContext.Models;

namespace MessagingApp.ApiContext.Dtos.MessageReaction
{
    public class MessageReactionForListDto
    {
        public int? UserId { get; set; }
        public UserForListDto User { get; set; }

        public int? MessageId { get; set; }

        public Reaction Reaction { get; set; }
    }
}

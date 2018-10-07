using System.Collections.Generic;
using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;

namespace MessagingApp.ApiContext.Data
{
    public partial interface IBaseRepository
    {
        Task<ICollection<Conversation>> GetConversations(int userId);
        Task<Conversation> GetConversation(int conversationId, int userId);
        Task<Conversation> CreateConversation(Conversation conversation);
    }
}

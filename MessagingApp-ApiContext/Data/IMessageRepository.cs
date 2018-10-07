using System.Collections.Generic;
using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;

namespace MessagingApp.ApiContext.Data
{
    public partial interface IBaseRepository
    {
        Task<ICollection<Message>> GetMessages(int conversationId, int userId);
        Task<Message> GetMessage(int messageId, int userId);
        Task<Message> CreateMessage(Message message);
    }
}

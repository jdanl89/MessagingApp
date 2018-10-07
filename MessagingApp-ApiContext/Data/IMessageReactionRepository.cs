using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;

namespace MessagingApp.ApiContext.Data
{
    public partial interface IBaseRepository
    {
        Task<MessageReaction> GetMessageReaction(int messageId, int userId);
        Task<MessageReaction> CreateMessageReaction(MessageReaction messageReaction);
    }
}

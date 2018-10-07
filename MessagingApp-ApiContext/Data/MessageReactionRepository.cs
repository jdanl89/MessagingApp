using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingApp.ApiContext.Data
{
    public partial class BaseRepository
    {
        public async Task<MessageReaction> GetMessageReaction(int messageId, int userId)
        {
            return await _context.MessageReactions
                .FirstOrDefaultAsync(messageReaction =>
                    messageReaction.MessageId == messageId &&
                    messageReaction.UserId == userId);
        }

        public async Task<MessageReaction> CreateMessageReaction(MessageReaction messageReaction)
        {
            await _context.MessageReactions.AddAsync(messageReaction);

            await _context.SaveChangesAsync();

            return messageReaction;
        }
    }
}

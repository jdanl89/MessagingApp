using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingApp.ApiContext.Data
{
    public partial class BaseRepository
    {
        public async Task<ICollection<Message>> GetMessages(int conversationId, int userId)
        {
            return await _context.UserConversations
                .Where(userConversation =>
                    userConversation.UserId == userId && userConversation.ConversationId == conversationId)
                .SelectMany(userConversation => userConversation.Conversation.Messages)
                .Include(message => message.User)
                .Include(message => message.MessageReactions)
                .ToListAsync();
        }

        public async Task<Message> GetMessage(int messageId, int userId)
        {
            return await _context.UserConversations
                .Where(userConversation => userConversation.UserId == userId)
                .SelectMany(userConversation => userConversation.Conversation.Messages)
                .Include(message => message.User)
                .Include(message => message.MessageReactions)
                .FirstOrDefaultAsync(message => message.Id == messageId);
        }

        public async Task<Message> CreateMessage(Message message)
        {
            await _context.Messages.AddAsync(message);

            await _context.SaveChangesAsync();

            return message;
        }
    }
}

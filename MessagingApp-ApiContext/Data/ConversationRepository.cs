using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingApp.ApiContext.Data
{
    public partial class BaseRepository
    {
        public async Task<ICollection<Conversation>> GetConversations(int userId)
        {
            return await _context.UserConversations
                .Where(userConversation => userConversation.UserId == userId)
                .Select(userConversation => userConversation.Conversation)
                .Include(conversation => conversation.UserConversations)
                .ThenInclude(userConversation => userConversation.User)
                .ThenInclude(message => message.MessageReactions)
                .OrderByDescending(conv => conv.LastUpdated)
                .ToListAsync();
        }

        public async Task<Conversation> GetConversation(int conversationId, int userId)
        {
            var conversation = await _context.Conversations
                .Include(conv => conv.UserConversations)
                .ThenInclude(userConversation => userConversation.User)
                .Include(conv => conv.Messages)
                .ThenInclude(message => message.User)
                .ThenInclude(message => message.MessageReactions)
                .FirstOrDefaultAsync(conv => conv.Id == conversationId);

            conversation.Messages = conversation.Messages.OrderBy(m => m.Id).ToList();

            return conversation.UserConversations.Any(uc => uc.UserId == userId) ? conversation : null;
        }

        public async Task<Conversation> CreateConversation(Conversation conversation)
        {
            await _context.Conversations.AddAsync(conversation);

            await _context.SaveChangesAsync();

            return conversation;
        }
    }
}

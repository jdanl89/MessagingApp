using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingApp.ApiContext.Data
{
    public partial class BaseRepository
    {
        public async Task<ICollection<User>> GetUsers(int? conversationId)
        {
            if (conversationId != null)
                return await _context.Users
                    .Where(user => user.UserConversations
                                       .Select(userConversation => 
                                           userConversation.ConversationId == conversationId) != null)
                    .ToListAsync();
            else
                return await _context.Users
                    .ToListAsync();
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
        }
    }
}

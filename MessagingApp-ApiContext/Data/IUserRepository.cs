using System.Collections.Generic;
using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;

namespace MessagingApp.ApiContext.Data
{
    public partial interface IBaseRepository
    {
        Task<ICollection<User>> GetUsers(int? conversationId);
        Task<User> GetUser(int id);
    }
}

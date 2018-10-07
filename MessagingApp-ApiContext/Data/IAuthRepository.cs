using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;

namespace MessagingApp.ApiContext.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<User> ChangePassword(User user, string password);
        Task<bool> UserExists(string username);
    }
}

using System.Threading.Tasks;
using MessagingApp.ApiContext.Models;
using Microsoft.AspNetCore.SignalR;

namespace MessagingApp.ApiContext.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}

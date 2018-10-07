using System.Net;

namespace MessagingApp.ApiContext.Models.Exceptions
{
    public interface IApiException<TContent>
    {
        HttpStatusCode StatusCode { get; set; }
        TContent Content { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace MessagingApp.ApiContext.Dtos.User
{
    public class UserForUpdateDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "You must specify a username between 4 and 16 characters")]
        public string Username { get; set; }
    }
}

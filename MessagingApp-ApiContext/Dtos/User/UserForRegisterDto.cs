using System;
using System.ComponentModel.DataAnnotations;

namespace MessagingApp.ApiContext.Dtos.User
{
    public class UserForRegisterDto
    {
        [Required]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "You must specify a username between 4 and 16 characters")]
        public string Username { get; set; }

        [Required]
        [StringLength(32, MinimumLength = 6, ErrorMessage = "You must specify a password between 6 and 32 characters")]
        public string Password { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }
        
        public DateTime LastUpdated { get; set; }

        UserForRegisterDto()
        {
            Created = DateTime.UtcNow;
            LastActive = DateTime.UtcNow;
            LastUpdated = DateTime.UtcNow;
        }
    }
}

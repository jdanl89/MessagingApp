namespace MessagingApp.ApiContext.Dtos.User
{
    public class UserForChangePasswordDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }
}

using MessagingApp.ApiContext.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingApp.ApiContext.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserConversation> UserConversations { get; set; }
        public DbSet<MessageReaction> MessageReactions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserConversation>()
                .HasKey(uc => new {uc.UserId, uc.ConversationId});

            builder.Entity<UserConversation>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserConversations)
                .HasForeignKey(uc => uc.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserConversation>()
                .HasOne(uc => uc.Conversation)
                .WithMany(c => c.UserConversations)
                .HasForeignKey(uc => uc.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<MessageReaction>()
                .HasKey(mr => new {mr.UserId, mr.MessageId});

            builder.Entity<MessageReaction>()
                .HasOne(mr => mr.User)
                .WithMany(u => u.MessageReactions)
                .HasForeignKey(mr => mr.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<MessageReaction>()
                .HasOne(um => um.Message)
                .WithMany(m => m.MessageReactions)
                .HasForeignKey(um => um.MessageId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

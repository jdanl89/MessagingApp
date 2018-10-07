using System.Linq;
using AutoMapper;
using MessagingApp.ApiContext.Dtos.Conversation;
using MessagingApp.ApiContext.Dtos.Message;
using MessagingApp.ApiContext.Dtos.MessageReaction;
using MessagingApp.ApiContext.Dtos.User;
using MessagingApp.ApiContext.Models;

namespace MessagingApp.ApiContext.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForListDto, UserConversation>();

            CreateMap<ConversationForCreateDto, Conversation>();
            CreateMap<ConversationForUpdateDto, Conversation>()
                .ForMember(conversation => conversation.Id, opt => opt.UseDestinationValue())
                .ForMember(conversation => conversation.Messages, opt => opt.UseDestinationValue())
                .ForMember(conversation => conversation.Created, opt => opt.UseDestinationValue());
            CreateMap<ConversationForDetailedDto, Conversation>();
            CreateMap<ConversationForListDto, Conversation>();
            CreateMap<Conversation, ConversationForDetailedDto>()
                .ForMember(dto => dto.Users, opt => opt.MapFrom(conversation => conversation.UserConversations.Select(uc => uc.User)));
            CreateMap<Conversation, ConversationForListDto>()
                .ForMember(dto => dto.Users, opt => opt.MapFrom(conversation => conversation.UserConversations.Select(uc => uc.User)));

            CreateMap<MessageForCreateDto, Message>();
            CreateMap<MessageForUpdateDto, Message>()
                .ForMember(message => message.Id, opt => opt.UseDestinationValue())
                .ForMember(message => message.ConversationId, opt => opt.UseDestinationValue())
                .ForMember(message => message.Conversation, opt => opt.UseDestinationValue())
                .ForMember(message => message.MessageReactions, opt => opt.UseDestinationValue())
                .ForMember(message => message.UserId, opt => opt.UseDestinationValue())
                .ForMember(message => message.User, opt => opt.UseDestinationValue())
                .ForMember(message => message.Created, opt => opt.UseDestinationValue());
            CreateMap<MessageForDetailedDto, Message>();
            CreateMap<MessageForListDto, Message>();
            CreateMap<Message, MessageForDetailedDto>();
            CreateMap<Message, MessageForListDto>();

            CreateMap<MessageReactionForCreateDto, MessageReaction>();
            CreateMap<MessageForUpdateDto, MessageReaction>()
                .ForMember(messageReaction => messageReaction.MessageId, opt => opt.UseDestinationValue())
                .ForMember(messageReaction => messageReaction.Message, opt => opt.UseDestinationValue())
                .ForMember(messageReaction => messageReaction.UserId, opt => opt.UseDestinationValue())
                .ForMember(messageReaction => messageReaction.User, opt => opt.UseDestinationValue())
                .ForMember(messageReaction => messageReaction.Created, opt => opt.UseDestinationValue());
            CreateMap<MessageForDetailedDto, MessageReaction>();
            CreateMap<MessageForListDto, MessageReaction>();
            CreateMap<MessageReaction, MessageForDetailedDto>();
            CreateMap<MessageReaction, MessageForListDto>();

            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserForUpdateDto, User>()
                .ForMember(user => user.Id, opt => opt.UseDestinationValue())
                .ForMember(user => user.MessageReactions, opt => opt.UseDestinationValue())
                .ForMember(user => user.Messages, opt => opt.UseDestinationValue())
                .ForMember(user => user.UserConversations, opt => opt.UseDestinationValue());
            CreateMap<UserForDetailedDto, User>();
            CreateMap<UserForListDto, User>();
            CreateMap<User, UserForDetailedDto>();
            CreateMap<User, UserForListDto>();
        }
    }
}

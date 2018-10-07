using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessagingApp.ApiContext.Data;
using MessagingApp.ApiContext.Dtos.Conversation;
using MessagingApp.ApiContext.Helpers;
using MessagingApp.ApiContext.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingApp.App.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    public class ConversationsController : Controller
    {
        private readonly IBaseRepository _repo;
        private readonly IMapper _mapper;

        public ConversationsController(IBaseRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> CreateConversation([FromBody] ConversationForCreateDto conversationForCreateDto)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var conversationForCreate = _mapper.Map<Conversation>(conversationForCreateDto);

            var createdConversation = await _repo.CreateConversation(conversationForCreate);

            createdConversation.UserConversations = new List<UserConversation>();

            foreach (var userDto in conversationForCreateDto.Users)
            {
                var user = await _repo.GetUser(userDto.Id);
                
                createdConversation.UserConversations.Add(new UserConversation
                {
                    ConversationId = createdConversation.Id,
                    Conversation = createdConversation,
                    UserId = user.Id,
                    User = await _repo.GetUser(user.Id)
                });
            }

            createdConversation.UserConversations.Add(new UserConversation
            {
                ConversationId = createdConversation.Id,
                Conversation = createdConversation,
                UserId = userFromRepo.Id,
                User = userFromRepo
            });

            await _repo.SaveAll();

            var conversationForReturn = _mapper.Map<ConversationForDetailedDto>(createdConversation);

            return Ok(conversationForReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetConversations()
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var conversationsFromRepo = await _repo.GetConversations(currentUserId);

            var conversationsForReturn = _mapper.Map<List<ConversationForDetailedDto>>(conversationsFromRepo);

            return Ok(conversationsForReturn);
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListConversations()
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var conversationsFromRepo = await _repo.GetConversations(currentUserId);

            var conversationsForReturn = _mapper.Map<List<ConversationForListDto>>(conversationsFromRepo);

            return Ok(conversationsForReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetConversation(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var conversationFromRepo = await _repo.GetConversation(id, currentUserId);

            var conversationForReturn = _mapper.Map<ConversationForDetailedDto>(conversationFromRepo);

            return Ok(conversationForReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateConversation([FromBody] ConversationForUpdateDto conversationForUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var conversationFromRepo = await _repo.GetConversation(conversationForUpdateDto.Id, currentUserId);

            _mapper.Map(conversationForUpdateDto, conversationFromRepo);

            await _repo.SaveAll();

            var conversationForReturn = _mapper.Map<ConversationForDetailedDto>(conversationFromRepo);

            return Ok(conversationForReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConversation(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var conversationFromRepo = await _repo.GetConversation(id, currentUserId);

            _repo.Delete(conversationFromRepo);

            return Ok();
        }
    }
}
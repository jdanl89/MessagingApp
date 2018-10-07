using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessagingApp.ApiContext.Data;
using MessagingApp.ApiContext.Dtos.Message;
using MessagingApp.ApiContext.Helpers;
using MessagingApp.ApiContext.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingApp.App.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        private readonly IBaseRepository _repo;
        private readonly IMapper _mapper;

        public MessagesController(IBaseRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage([FromBody] MessageForCreateDto messageForCreateDto)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var conversationFromRepo = await _repo.GetConversation((int) messageForCreateDto.ConversationId, currentUserId);

            var messageForCreate = _mapper.Map<Message>(messageForCreateDto);

            messageForCreate.Conversation = conversationFromRepo;
            messageForCreate.User = userFromRepo;

            var createdMessage = await _repo.CreateMessage(messageForCreate);

            var messageForReturn = _mapper.Map<MessageForDetailedDto>(createdMessage);

            return Ok(messageForReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessages(int conversationId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var messagesFromRepo = await _repo.GetMessages(conversationId, currentUserId);

            var messagesForReturn = _mapper.Map<List<MessageForDetailedDto>>(messagesFromRepo);

            return Ok(messagesForReturn);
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListMessages(int conversationId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var messagesFromRepo = await _repo.GetMessages(conversationId, currentUserId);

            var messagesForReturn = _mapper.Map<List<MessageForListDto>>(messagesFromRepo);

            return Ok(messagesForReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessage(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id, currentUserId);

            var messageForReturn = _mapper.Map<MessageForDetailedDto>(messageFromRepo);

            return Ok(messageForReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMessage([FromBody] MessageForUpdateDto messageForUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(messageForUpdateDto.Id, currentUserId);

            _mapper.Map(messageForUpdateDto, messageFromRepo);

            await _repo.SaveAll();

            var messageForReturn = _mapper.Map<MessageForDetailedDto>(messageFromRepo);

            return Ok(messageForReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id, currentUserId);

            if (messageFromRepo.UserId == currentUserId)
                _repo.Delete(messageFromRepo);
            else
                return Unauthorized();

            return Ok();
        }
    }
}
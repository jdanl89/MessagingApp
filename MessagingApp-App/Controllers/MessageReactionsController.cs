using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessagingApp.ApiContext.Data;
using MessagingApp.ApiContext.Dtos.MessageReaction;
using MessagingApp.ApiContext.Helpers;
using MessagingApp.ApiContext.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingApp.App.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    public class MessageReactionsController : Controller
    {
        private readonly IBaseRepository _repo;
        private readonly IMapper _mapper;

        public MessageReactionsController(IBaseRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessageReaction([FromBody] MessageReactionForCreateDto messageReactionForCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var messageReactionForCreate = new MessageReaction
            {
                MessageId = messageReactionForCreateDto.Message.Id,
                Message = await _repo.GetMessage(messageReactionForCreateDto.Message.Id,
                    messageReactionForCreateDto.User.Id),
                UserId = messageReactionForCreateDto.User.Id,
                User = await _repo.GetUser(messageReactionForCreateDto.User.Id),
                Reaction = messageReactionForCreateDto.Reaction,
                Created = DateTime.Now,
                LastUpdated = DateTime.Now
            };

            var createdMessageReaction = await _repo.CreateMessageReaction(messageReactionForCreate);

            var messageReactionForReturn = _mapper.Map<MessageReactionForDetailedDto>(createdMessageReaction);

            return Ok(messageReactionForReturn);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMessageReaction([FromBody] MessageReactionForUpdateDto messageReactionForUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            if (messageReactionForUpdateDto.MessageId == null)
                return BadRequest();

            var messageReactionFromRepo = await _repo.GetMessageReaction((int) messageReactionForUpdateDto.MessageId, currentUserId);

            messageReactionFromRepo.Reaction = messageReactionForUpdateDto.Reaction;
            messageReactionFromRepo.LastUpdated = DateTime.Now;

            await _repo.SaveAll();

            var messageReactionForReturn = _mapper.Map<MessageReactionForDetailedDto>(messageReactionFromRepo);

            return Ok(messageReactionForReturn);
        }

        [HttpDelete("{messageId}")]
        public async Task<IActionResult> DeleteMessageReaction(int messageId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var messageReactionFromRepo = await _repo.GetMessageReaction(messageId, currentUserId);
            
            _repo.Delete(messageReactionFromRepo);

            await _repo.SaveAll();

            return Ok();
        }
    }
}
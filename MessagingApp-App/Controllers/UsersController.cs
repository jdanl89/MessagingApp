using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessagingApp.ApiContext.Data;
using MessagingApp.ApiContext.Dtos.User;
using MessagingApp.ApiContext.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingApp.App.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IBaseRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IBaseRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(int? conversationId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var users = await _repo.GetUsers(conversationId);

            var usersToReturn = _mapper.Map<IList<UserForDetailedDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListUsers(int? conversationId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null)
                return Unauthorized();

            var usersFromRepo = await _repo.GetUsers(conversationId);

            var usersToReturn = _mapper.Map<IList<UserForListDto>>(usersFromRepo);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var currentUserFromRepo = await _repo.GetUser(currentUserId);

            if (currentUserFromRepo == null)
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(userFromRepo);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromBody] UserForUpdateDto userForUpdateDto)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null || currentUserId != userForUpdateDto.Id)
                return Unauthorized();

            _mapper.Map(userForUpdateDto, userFromRepo);

            await _repo.SaveAll();

            var userForReturn = _mapper.Map<UserForDetailedDto>(userFromRepo);

            return Ok(userForReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            if (userFromRepo == null || currentUserId != id)
                return Unauthorized();

            _repo.Delete(userFromRepo);

            return Ok();
        }
    }
}
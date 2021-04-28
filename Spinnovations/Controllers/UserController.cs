using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Spinnovations.Data;
using Spinnovations.Models;

namespace Spinnovations.Controllers
{
    [ApiController]
    [Route("api/Users")]
    public class UserController : FirebaseEnabledController
    {
        UserRepository _repo;

        public UserController(UserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAllUsers());
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _repo.GetUser(id);
            if (user == null)
            {
                return NotFound("This user does not exist.");
            }
            return Ok(user);
        }

        [HttpGet("firebase/{firebase_Uid}")]
        public IActionResult GetUserByFirebaseUid(string firebase_Uid)
        {
            var user = _repo.GetUserByFirebaseUid(firebase_Uid);
            if (user == null)
            {
                return NotFound("This user does not exist.");
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddNewUser(User user)
        {
            _repo.AddUser(user);
            return Created($"api/Users/{user.Id}", user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(User user)
        {
            _repo.UpdateUser(user);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            _repo.DeleteUser(id);
            return Ok();
        }
    }
}

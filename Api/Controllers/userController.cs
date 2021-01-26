using System.Threading.Tasks;
using Api.Data.DTOS.ForUpdate;
using Api.Data.IRepository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers {
    [ApiController]
    [AllowAnonymous]
    [Route ("api/[controller]")]
    public class userController : ControllerBase {

        private readonly IOnlineShopping _repo;

        public userController (IOnlineShopping shoppingRepo) {
            _repo = shoppingRepo;
        }

        [HttpPatch ("{userId}")]
        public async Task<IActionResult> updateUserData (int userId, UserForUpdate userForUpdate) {
            var getUser = await _repo.getUser (userId);

            getUser.Address = userForUpdate.Address;
            getUser.City = userForUpdate.City;

            if (await _repo.SaveChanges ()) {

                return Ok (new {
                    userForUpdate,
                });
            }
            return BadRequest ($"user {userId} is already has these values");

        }
    }
}
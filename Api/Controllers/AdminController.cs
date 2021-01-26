using System.Collections.Generic;
using Api.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers {

    [ApiController]
    [Route ("api/[controller]")]
    public class AdminController : ControllerBase {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public AdminController (UserManager<User> userManager, RoleManager<Role> roleManager) {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [AllowAnonymous]
        [HttpPost ("createAdmin")]
        public IActionResult createAdmin () {
            //create adminUser
            var adminUser = new User {
                UserName = "Admin",
                Email = "admin@shopping.com"
            };

            var result = _userManager.CreateAsync (adminUser, "AdminPassword").Result;

            if (result.Succeeded) {
                var admin = _userManager.FindByEmailAsync ("admin@shopping.com").Result;
                _userManager.AddToRolesAsync (admin, new [] { "Admin", "Moderator" }).Wait ();
            }
            return Ok (result);
        }

        [HttpPost ("createRoles")]
        public IActionResult createRoles () {
            var roles = new List<Role> {
                new Role { Name = "Customer" },
                new Role { Name = "Admin" },
                new Role { Name = "Moderator" },
                new Role { Name = "VIP" }
            };

            foreach (var role in roles) {
                _roleManager.CreateAsync (role).Wait ();
            }
            return Ok ();
        }
    }
}
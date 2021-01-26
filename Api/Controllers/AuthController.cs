using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Api.Data.DTOS.ForCreations;
using Api.Data.DTOS.ForReturn;
using Api.Data.DTOS.ForUpdate;
using Api.Data.Helper;
using Api.Data.IRepository;
using Api.Models;
using Api.Models.UserModel;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Controllers {
    [ApiController]
    [AllowAnonymous]
    [Route ("api/[controller]")]
    public class AuthController : ControllerBase {
        private const string V = "confirmEmail";
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IOptions<EmailConfigrations> _emailConfig;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        private IWebHostEnvironment _hostEnvironment;

        [Obsolete]
        public AuthController (
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IOptions<EmailConfigrations> emailConfig,
            IMapper mapper,
            IEmailSender emailSender,
            IConfiguration config,
            IWebHostEnvironment hostEnvironment) {

            _userManager = userManager;
            _signInManager = signInManager;
            _emailConfig = emailConfig;
            _emailSender = emailSender;
            _mapper = mapper;
            _config = config;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost ("register")]
        public async Task<IActionResult> Register (UserForCreation userForCreationDto) {
            var userToCreate = _mapper.Map<User> (userForCreationDto);

            var result = await _userManager.CreateAsync (userToCreate, userForCreationDto.Password);

            if (result.Succeeded) {
                await _userManager.AddToRoleAsync (userToCreate, "Customer");
                await sendConfirmMessage (userToCreate.Id.ToString ());
                return Ok ();

            }

            return BadRequest (result.Errors);
        }

        [HttpPost ("sendConfrimEmail/{userId}")]
        public async Task<IActionResult> sendConfirmMessage (string userId) {
            User getUser = await _userManager.FindByIdAsync (userId);

            var confiromEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync (getUser);
            var confiromEmailUrl = Request.Headers["confirmEmailUrl"];

            var uriBuilder = new UriBuilder (confiromEmailUrl);
            var query = HttpUtility.ParseQueryString (uriBuilder.Query);
            query["token"] = confiromEmailToken;
            query["userId"] = getUser.Id.ToString ();
            uriBuilder.Query = query.ToString ();
            var urlString = uriBuilder.ToString ();

            var emailBody = EmailPage (getUser.UserName, urlString);
            Messages message = new Messages (getUser.Email, "confirom Email", emailBody);
            await _emailSender.SendEmail (message);

            return Ok ();
        }

        [HttpPost ("login")]
        public async Task<IActionResult> Login (userForLogin userForLoginDto) {
            var user = await _userManager.FindByEmailAsync (userForLoginDto.Email.ToLower ());
            if (user != null) {
                if (!user.EmailConfirmed) {
                    return BadRequest ("ConfirmEmail");
                }

                var result = await _signInManager.CheckPasswordSignInAsync (user, userForLoginDto.Password, true);

                if (result.Succeeded) {
                    var userToReturn = _mapper.Map<UsersForReturn> (user);

                    return Ok (new {
                        token = GenerateJwtToken (user).Result,
                            user = userToReturn
                    });
                }
                return BadRequest ("incorrectPassword");
            }
            return Unauthorized ("noAccountFound");
        }

        private async Task<string> GenerateJwtToken (User user) {
            var claims = new List<Claim> {
                new Claim (ClaimTypes.NameIdentifier, user.Id.ToString ()),
                new Claim (ClaimTypes.Email, user.Email),
                new Claim (ClaimTypes.Name, user.UserName),
            };
            var roles = await _userManager.GetRolesAsync (user);

            foreach (var role in roles) {
                claims.Add (new Claim (ClaimTypes.Role, role));
            }
            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (
                _config.GetSection ("AppSettings:Token").Value));

            var creds = new SigningCredentials (key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (claims),
                Expires = DateTime.Now.AddDays (30),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler ();

            var token = tokenHandler.CreateToken (tokenDescriptor);

            return tokenHandler.WriteToken (token);

        }

        [HttpPost (V)]
        public async Task<IActionResult> ConfiromEmail (confirmUserEmail UserDto) {
            var user = await _userManager.FindByIdAsync (UserDto.UserId.ToString ());

            var confirm = await _userManager.ConfirmEmailAsync (user, Uri.UnescapeDataString (UserDto.Token));

            if (confirm.Succeeded) {

                return Ok ();
            }

            return Unauthorized ("Account does not confrim");
        }

        private string EmailPage (string userName, string url) {
            string body = string.Empty;
            var path = Path.Combine (_hostEnvironment.WebRootPath, @"EmailTemplete/EmailConfirmation.html");
            using (StreamReader reader = new StreamReader (new FileStream (path, FileMode.Open))) {
                body = reader.ReadToEnd ();

                body = body.Replace ("{UserName}", userName);
                body = body.Replace ("{url}", url);

                return body;
            }

        }
    }
}
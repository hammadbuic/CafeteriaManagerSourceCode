using CafeteriaManageBackend.Models;
using CafeteriaManageBackend.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CafeteriaManageBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //injecting applicationuser
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly AppConfig _appConfig;
        private readonly CafeteriaDbContext _db;
        private readonly EmailService.IEmailSender _emailSender;
        public AuthController(EmailService.IEmailSender emailSender,UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<AppConfig> appConfig, CafeteriaDbContext db)
        {
            _emailSender = emailSender;
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
            _appConfig = appConfig.Value;
        }
        [HttpGet]
        [Authorize]
        // GET: api/UserProfile
        public async Task<Object> getUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var dbRole = await _userManager.GetRolesAsync(user);
            var role = dbRole[0].ToString();
            return new
            {
                user.Id,
                user.FullName,
                user.UserName,
                user.Email,
                role
            };
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> ResetPassword([FromBody] PasswordResetDTO password)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var user = await _userManager.FindByEmailAsync(password.Email);
            if (user == null)
                return BadRequest("Invalid Request");
            var resetPassResult = await _userManager.ResetPasswordAsync(user, password.Token, password.Password);
            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);
                return BadRequest(new { Errors = errors });
            }
            return Ok();
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> forgotPassword([FromBody] ForgotPasswordDTO forgotPassword)
        {
            if (!ModelState.IsValid) return BadRequest();
            var user = await _userManager.FindByEmailAsync(forgotPassword.email);
            if (user == null) return BadRequest("Invalid Request! User not found");
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string>
            {
                {"token",token },
                {"email",forgotPassword.email }
            };
            var callback = QueryHelpers.AddQueryString(forgotPassword.clientURI, param);
            var message = new EmailService.Message(new string[] { user.Email }, "Password Rest Token","A.O.A "+user.FullName+",\n\nClick the link to reset your password\n"+ callback+"Please Contact Admin if you don't know about this activity. \n\nThank you");
            await _emailSender.SendEmailAsync(message);
            return Ok();
        }
        [HttpPost("[action]")]
        public async Task<Object> postUser(User inUser)
        {
            var user = new ApplicationUser
            {
                FullName = inUser.fullname,
                UserName = inUser.username,
                Email = inUser.email
            };
            try
            {
                var result = await _userManager.CreateAsync(user, inUser.password);
                await _userManager.AddToRoleAsync(user, "Customer");
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token, email = user.Email }, Request.Scheme);
                var message = new EmailService.Message(new string[] { user.Email }, "Confirmation Email Link", "A.O.A " + user.FullName + ",\n\nPlease Confirm Your Email to use Cafeteria Application.\n" + confirmationLink + "\n\nIgnore this email if you don't know what it's about\n\n Thank You \n\n");
                await _emailSender.SendEmailAsync(message);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string token, [FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            { return BadRequest(); }
            var result = await _userManager.ConfirmEmailAsync(user, token);
            return Ok(result.Succeeded);
            //return View(result.Succeeded ? nameof(ConfirmEmail) : "Error");
        }
        [HttpPost]
        [Route("[action]")]
        //POST: api/ApplicationUser/Login
        public async Task<IActionResult> Login(Login model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            IdentityOptions _options = new IdentityOptions();
            try
            {
                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password) && await _userManager.IsEmailConfirmedAsync(user))
                {
                    var role = await _userManager.GetRolesAsync(user);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim("UserID", user.Id.ToString()),
                            new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                        }),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appConfig.JWTSecret)), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    return Ok(new { token });
                }
                else
                {
                    return BadRequest(new { message = "username or password is incorrect or confirm the email" });
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}

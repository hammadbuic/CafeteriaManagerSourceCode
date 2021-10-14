using CafeteriaManageBackend.Models;
using CafeteriaManageBackend.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeteriaManageBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly EmailService.IEmailSender _emailSender;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        CafeteriaDbContext _db;
        public AdminController(EmailService.IEmailSender emailSender,CafeteriaDbContext db, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _emailSender = emailSender;
            _db = db;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        //Get List of supervisors
        [HttpGet("[action]")]
        //[Authorize(Roles = "Admin")]
        public async Task<Object> getAdmins()
        {
            var admins = await _userManager.GetUsersInRoleAsync("Admin");
            return admins.Select(x => adminToDTOS(x)).ToList();
        }
        private static Admin adminToDTOS(ApplicationUser user) => 
        new Admin
        {
            id = user.Id,
            fullname = user.FullName,
            username = user.UserName,
            email = user.Email
        };
        [HttpPost]
        //[Authorize(Roles ="Admin")]
        public async Task<Object> postAdmin(Admin admin)
        {
            var user = new ApplicationUser
            {
                FullName = admin.fullname,
                UserName = admin.username,
                Email = admin.email
            };
            try
            {
                var result = await _userManager.CreateAsync(user, "root123");
                await _userManager.AddToRoleAsync(user, "Admin");
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token, email = user.Email }, Request.Scheme);
                var message = new EmailService.Message(new string[] { user.Email }, "Confirmation Email Link", "A.O.A "+user.FullName+",\n\nPlease Confirm Your Email to use Cafeteria Management System.\n"+confirmationLink+"\n\nIgnore this email if you don't know what it's about\n\n Thank You \n\n");
                await _emailSender.SendEmailAsync(message);
                return Ok(result);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> ConfirmEmail([FromQuery]string token,[FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            { return BadRequest(); }
            var result = await _userManager.ConfirmEmailAsync(user, token);
            return Ok(result.Succeeded);
            //return View(result.Succeeded ? nameof(ConfirmEmail) : "Error");
        }
        //Deleting a admin
        //api/admin/id
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> deleteAdmin([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var findAdmin = _db.Users.FirstOrDefault(p => p.Id == id);
            if (findAdmin == null)
            {
                return NotFound();
            }
            _db.Users.Remove(findAdmin);
            await _db.SaveChangesAsync();
            return Ok(new JsonResult("Admin with id: " + id + "is Deleted"));
        }
    }
}

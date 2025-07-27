using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")] // locahost:5001/api/members
    [ApiController]
    public class MembersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {

            
// تحقق أولًا إن كان هناك مستخدم بنفس الإيميل لتجنب التكرار (اختياري)
    var existingUser = await context.Users.FirstOrDefaultAsync(u => u.DisplayEmail == "test501@example.com");
    
    if (existingUser == null)
    {
        var newUser = new AppUser
        {
            
            DisplayName = "Test User 500",
            DisplayEmail = "test501@example.com"
        };

        context.Users.Add(newUser);
        await context.SaveChangesAsync(); 
    }
            

            var members = await context.Users.ToListAsync();

            return members;
        }

        [HttpGet("{id}")] // locahost:5001/api/members/bob-id
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
            var member = await context.Users.FindAsync(id);

            if (member == null) return NotFound();

            return member;
        }
    }
}
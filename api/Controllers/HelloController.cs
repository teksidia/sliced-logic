using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelloController : ControllerBase
    {
        [HttpGet(Name = "GetHello")]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(new { Message = "Hello " + User.Identity?.Name ?? "Unknown" }); 
        }
    }
}

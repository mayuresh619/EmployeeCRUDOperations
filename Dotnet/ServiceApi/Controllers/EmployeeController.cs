using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ServiceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public EmployeeController() { }

        [HttpGet]
        [Route("GetEmp")]
        public IActionResult FetchEmployeeData([FromQuery]string username,[FromQuery] string password) {
            if (username == null || password == null)
                return BadRequest("Enter valid data");

            if(username == "Mayuresh" && password == "123456")
            {
                return Ok("Valid User");
            }

            return Ok("Invalid user");
        }
    }
}

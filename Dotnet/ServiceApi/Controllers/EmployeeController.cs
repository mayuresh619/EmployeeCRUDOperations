using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ServiceApi.Model;
using ServiceApi.Service;

namespace ServiceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        IEmployeeOperationsService _employeeOperationsService;
        public EmployeeController(IEmployeeOperationsService employeeOperationsService) 
        {
            _employeeOperationsService = employeeOperationsService;
        }

        [HttpGet]
        [Route("GetEmp")]
        public IActionResult FetchEmployeeData([FromQuery]string username,[FromQuery] string password) {
            if (username == null || password == null)
                return BadRequest("Enter valid data");

            if(_employeeOperationsService.FetchEmployeeData(username,password))
            {
                return Ok("Valid User");
            }

            return NotFound("Invalid user");
        }

        [HttpGet]
        [Route("GetEmpList")]
        public IActionResult FetchEmployeeList()
        {

            var result = _employeeOperationsService.FetchEmployeeList();
            if(result !=  null)
                return Ok(result);
            
            return BadRequest("Invalid Data");
        }

        [HttpPost]
        [Route("RegisterEmployee")]
        public IActionResult RegisterEmployeeData(EmployeeRegisterRequest request)
        {
            if (request == null)
                return BadRequest("Invalid Data");

            if(_employeeOperationsService.RegisterEmployee(request))
            {
                return Ok("Registered");
            }
            return BadRequest();
        }

        [HttpPatch]
        [Route("UpdateEmployee")]
        public IActionResult UpdateEmployee(EmployeeUpdateRequest request)
        {
            if (request == null)
                return BadRequest("Invalid Data");

            if(_employeeOperationsService.UpdateEmployee(request))
            {
                return Ok("Updated");
            }

            return BadRequest();
        }

        [HttpDelete]
        [Route("DeleteEmployee")]
        public IActionResult DeleteEmployee(int empId)
        {
            if (empId <= 0)
                return BadRequest("Invalid Employee Id");

            if (_employeeOperationsService.DeleteEmployee(empId))
            {
                return Ok("Deleted");
            }

            return BadRequest();
        }
    }
}

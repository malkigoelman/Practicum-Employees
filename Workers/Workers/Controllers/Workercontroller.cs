using AutoMapper;
using Employee.Api.Models;
using Employee.Core.DTOs;
using Employee.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Workers.Core.Models;
using Workers.Core.Repositories;

namespace Workers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        private readonly IWorkerService _workerService;
        private readonly IMapper _mapper;

        public WorkersController(IWorkerService workerService, IMapper mapper)
        {
            _workerService = workerService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var workers = await _workerService.GetAllAsync();
            return Ok(workers);
        }

        [HttpGet("/all")]
        [Produces("application/json")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _workerService.GetAllEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var worker = await _workerService.GetWorkerByIdAsync(id);
            if (worker == null)
            {
                return NotFound();
            }
            return Ok(worker);
        }

        [HttpGet("search/{searchString}")]
        public async Task<IActionResult> Search(string searchString)
        {
            var workers = await _workerService.SearchAsync(searchString);
            return Ok(workers);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeePostModel employee)
        {
            var emp = _mapper.Map<Worker>(employee);
            emp.Roles = _mapper.Map<List<Role>>(emp.Roles).ToList();
            //emp.Roles = employee.Roles.Select(role => _mapper.Map<Role>(role)).ToList();
            await _workerService.AddAsync(emp);
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var emp = _mapper.Map<Worker>(employee);
            var updatedEmp = await _workerService.UpdateAsync(id, emp);
            var empDto = _mapper.Map<EmployeeDto>(updatedEmp);
            return Ok(empDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _workerService.DeleteAsync(id);
            return Ok();
        }

        [HttpDelete("{id}/update")]
        public async Task<IActionResult> UpdateStatusAsync(int id)
        {
            var worker = await _workerService.GetWorkerByIdAsync(id);
            if (worker == null)
            {
                return NotFound();
            }
            await _workerService.UpdateStatusAsync(id);
            return Ok();
        }

    }
}

using AutoMapper;
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
        private readonly IWorkerRepository _workerRepository;
        private readonly IMapper _mapper;

        public WorkersController(IWorkerRepository workerRepository, IMapper mapper)
        {
            _workerRepository = workerRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var workers = await _workerRepository.GetAllAsync();
            return Ok(workers);
        }

        [HttpGet("/all")]
        [Produces("application/json")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _workerRepository.GetAllEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var worker = await _workerRepository.GetWorkerByIdAsync(id);
            if (worker == null)
            {
                return NotFound();
            }
            return Ok(worker);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Worker worker)
        {
            await _workerRepository.AddAsync(worker);
            return CreatedAtAction(nameof(Get), new { id = worker.Id }, worker);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Worker worker)
        {
            var existingWorker = await _workerRepository.GetWorkerByIdAsync(id);
            if (existingWorker == null)
            {
                return NotFound();
            }

            await _workerRepository.UpdateAsync(id, worker);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var worker = await _workerRepository.GetWorkerByIdAsync(id);
            if (worker == null)
            {
                return NotFound();
            }
            await _workerRepository.DeleteAsync(id);
            return Ok();
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string searchString)
        {
            var workers = await _workerRepository.SearchAsync(searchString);
            if (workers == null || !workers.Any())
            {
                return NotFound();
            }
            return Ok(workers);
        }
    }
}

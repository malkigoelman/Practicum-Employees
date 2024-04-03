using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Workers.Core.Models;
using Workers.Core.Repositories;
using Workers.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Workers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        private readonly IWorkerRepository _workerRepository;
        private readonly DataContext _dataContext;
        public WorkersController(IWorkerRepository workerRepository, DataContext dataContext)
        {
            _workerRepository = workerRepository;
            _dataContext = dataContext;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_workerRepository.GetAll());
        }
        [HttpGet("/all")]
        public ActionResult GetAllEmployees()
        {
            return Ok(_workerRepository.GetAllEmployees());
        }
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var worker = _workerRepository.GetWorkerById(id);
            if (worker == null)
            {
                return NotFound();
            }
            return Ok(worker);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Worker worker)
        {
            _workerRepository.Add(worker);

            //foreach (var role in worker.Roles)
            //{
            //    role.EmployeeId = worker.id;
            //    _dataContext.Roles.Add(role);
            //}
            _dataContext.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = worker.Tz }, worker);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Worker worker)
        {
            _workerRepository.Update(id, worker);
            var existingRoles = _dataContext.Roles.Where(r => r.EmployeeId == id).ToList();
            foreach (var role in existingRoles)
            {
                _dataContext.Roles.Remove(role);
            }
            //foreach (var role in worker.Roles)
            //{
            //    role.EmployeeId = id;
            //    _dataContext.Roles.Add(role);
            //}
            _dataContext.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var worker = _workerRepository.GetWorkerById(id);
            if (worker == null)
            {
                return NotFound();
            }
            _workerRepository.Delete(id);
            return Ok();
        }
    }
}

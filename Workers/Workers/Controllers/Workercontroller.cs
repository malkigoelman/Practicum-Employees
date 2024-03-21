using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Workers.Core.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Workers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        private readonly IWorkerRepository _workerRepository;

        public WorkersController(IWorkerRepository workerRepository)
        {
            _workerRepository = workerRepository;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_workerRepository.GetAll());
        }

        // GET api/<Workercontroller>/5
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

        // POST api/<Workercontroller>
        [HttpPost]
        public ActionResult Post([FromBody] Worker worker)
        {
            _workerRepository.Add(worker);
            return CreatedAtAction(nameof(Get), new { id = worker.Tz }, worker);
        }

        // PUT api/<Workercontroller>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Worker worker)
        {
            _workerRepository.Update(id, worker);
            return NoContent();
        }

        // DELETE api/<Workercontroller>/5
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

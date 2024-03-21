using Employee.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Repositories;

namespace Workers.Service
{
    public class WorkerService : IWorkerService
    {
        private readonly IWorkerRepository _workerRepository;
        public WorkerService(IWorkerRepository workerRepository)
        {
            _workerRepository = workerRepository;
        }
        public IEnumerable<Worker> GetAll()
        {
            return _workerRepository.GetAll();
        }
        public Worker GetWorkerById(int id)
        {
            return _workerRepository.GetWorkerById(id);
        }
        public void Add(Worker worker)
        {
            _workerRepository.Add(worker);
        }
        public void Update(int id, Worker worker)
        {
            _workerRepository.Update(id, worker);
        }
        public void Delete(int id)
        {
            _workerRepository.Delete(id);
        }
    }
}
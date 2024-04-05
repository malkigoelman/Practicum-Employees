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
        public async Task<IEnumerable<Worker>> GetAllAsync()
        {
            return await _workerRepository.GetAllAsync();
        }
        public async Task<IEnumerable<Worker>> GetAllEmployeesAsync()
        {
            return await _workerRepository.GetAllEmployeesAsync();
        }
        public async Task<Worker> GetWorkerByIdAsync(int id)
        {
            return await _workerRepository.GetWorkerByIdAsync(id);
        }

        public async Task AddAsync(Worker worker)
        {
            await _workerRepository.AddAsync(worker);
        }
        public async Task UpdateAsync(int id, Worker worker)
        {
            await _workerRepository.UpdateAsync(id, worker);
        }

        public async Task DeleteAsync(int id)
        {
            await _workerRepository.DeleteAsync(id);
        }
    }
}
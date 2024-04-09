using Employee.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Workers.Core.Repositories;
using Workers.Core.Models;

namespace Workers.Service
{
    public class WorkerService : IWorkerService
    {
        private readonly IWorkerRepository _workerRepository;

        public WorkerService(IWorkerRepository workerRepository) => _workerRepository = workerRepository;

        public async Task<IEnumerable<Worker>> GetAllAsync() { return await _workerRepository.GetAllAsync(); }

        public async Task<IEnumerable<Worker>> GetAllEmployeesAsync() => await _workerRepository.GetAllEmployeesAsync();

        public async Task<Worker> GetWorkerByIdAsync(int id)=> await _workerRepository.GetWorkerByIdAsync(id);

        public async Task AddAsync(Worker worker)=> await _workerRepository.AddAsync(worker);

        public async Task<Worker> UpdateAsync(int id, Worker worker)=> await _workerRepository.UpdateAsync(id, worker);

        public async Task DeleteAsync(int id)=> await _workerRepository.DeleteAsync(id);

        public async Task UpdateStatusAsync(int id) => await _workerRepository.UpdateStatusAsync(id);

        public async Task<IEnumerable<Worker>> SearchAsync(string s)=> await _workerRepository.SearchAsync(s);
    
    }
}

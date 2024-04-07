using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Workers;
using Workers.Core.Models;
using Workers.Core.Repositories;

namespace Employee.Data.Ropsitories
{
    public class WorkerRepository : IWorkerRepository
    {
        private readonly DataContext _dataContext;
        public WorkerRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task AddAsync(Worker worker)
        {
            _dataContext.Workers.Add(worker);
            await _dataContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            
            var worker = await GetWorkerByIdAsync(id);
            if (worker != null)
            {
                worker.IsActive = false;
                await _dataContext.SaveChangesAsync();
            }
        }
        public async Task<IEnumerable<Worker>> GetAllAsync()
        {
            return await _dataContext.Workers.Where(w => w.IsActive).ToListAsync();
        }
        public async Task<IEnumerable<Worker>> GetAllEmployeesAsync()
        {
            return await _dataContext.Workers.ToListAsync();
        }
        public async Task<Worker> GetWorkerByIdAsync(int id)
        {
            return await _dataContext.Workers.FirstOrDefaultAsync(w => w.Id == id);
        }
        public async Task UpdateAsync(int id, Worker worker)
        {
            Worker existingWorker =await GetWorkerByIdAsync(id);
            if (existingWorker != null)
            {
                existingWorker.FirstName = worker.FirstName;
                existingWorker.LastName = worker.LastName;
                existingWorker.Email = worker.Email;
                existingWorker.Tz = worker.Tz;
                existingWorker.StartDate = worker.StartDate;
                existingWorker.BirthDay = worker.BirthDay;
                existingWorker.Gender = worker.Gender;
                existingWorker.Roles = worker.Roles;
                _dataContext.SaveChanges();
            }
        }
        public async Task<IEnumerable<Role>> GetWorkerRolesAsync(int id)
        {
            var worker = await GetWorkerByIdAsync(id);
            if (worker != null)
            {
                return worker.Roles;
            }
            return null;
        }

    }
}

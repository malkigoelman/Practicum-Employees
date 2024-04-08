using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers;
using Workers.Core.Repositories;

namespace Employee.Core.Services
{
    public interface IWorkerService
    {
        Task<IEnumerable<Worker>> GetAllAsync();
        Task<IEnumerable<Worker>> GetAllEmployeesAsync();
        Task<Worker> GetWorkerByIdAsync(int id);
        Task AddAsync(Worker worker);
        Task UpdateAsync(int id, Worker worker);
        Task DeleteAsync(int id);
        Task UpdateStatusAsync(int id);
    }
}

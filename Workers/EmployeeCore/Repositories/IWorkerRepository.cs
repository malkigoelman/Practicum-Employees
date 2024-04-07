using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Workers.Core.Repositories
{
    public interface IWorkerRepository
    {
        Task<IEnumerable<Worker>> GetAllAsync();
        Task<IEnumerable<Worker>> GetAllEmployeesAsync();
        Task<Worker> GetWorkerByIdAsync(int id);
        Task AddAsync(Worker worker);
        Task UpdateAsync(int id, Worker worker);
        Task DeleteAsync(int id);
        Task<IEnumerable<Worker>> SearchAsync(string searchString);
    }
}

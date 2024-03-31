using System.Collections.Generic;
using System.Linq;
using Workers.Core.Models;
using Workers.Core.Repositories;

namespace Workers.Data
{
    public class WorkerRepository : IWorkerRepository
    {
        private readonly DataContext _dataContext;
        public WorkerRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public void Add(Worker worker)
        {
            _dataContext.Workers.Add(worker);
            _dataContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var worker = GetWorkerById(id);
            if (worker != null)
            {
                worker.Active = false;
                _dataContext.SaveChanges();
            }
        }

        public IEnumerable<Worker> GetAll()
        {
            return _dataContext.Workers.ToList();
        }

        public Worker GetWorkerById(int id)
        {
            return _dataContext.Workers.FirstOrDefault(w => w.Tz== id);
        }

        public void Update(int id, Worker worker)
        {
            var existingWorker = GetWorkerById(id);
            if (existingWorker != null)
            {
                existingWorker.F_name = worker.F_name;
                existingWorker.L_name = worker.L_name;
                // Update other properties as needed
                _dataContext.SaveChanges();
            }
        }
        public IEnumerable<Role> GetWorkerRoles(int id)
        {
            var worker = GetWorkerById(id);
            if (worker != null)
            {
                return worker.Roles;
            }
            return null;
        }
    }
}

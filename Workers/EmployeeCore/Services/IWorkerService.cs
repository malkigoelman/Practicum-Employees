using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers;

namespace Employee.Core.Services
{
    public interface IWorkerService
    {
        IEnumerable<Worker> GetAll();
        Worker GetWorkerById(int id);
        void Add(Worker worker);
        void Update(int id, Worker worker);
        void Delete(int id);
    }
}

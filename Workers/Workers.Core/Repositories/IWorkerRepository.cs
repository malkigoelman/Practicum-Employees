﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Workers.Core.Repositories
{
    public interface IWorkerRepository
    {
        IEnumerable<Worker> GetAll();
        Worker GetWorkerById(int id);
        void Add(Worker worker);
        void Update(int id, Worker worker);
        void Delete(int id);
    }
}

using Employee.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Models;

namespace Employee.Core.Services
{
    public interface IRoleService
    {
        IEnumerable<Role> Get();
        IEnumerable<RoleName> GetRoleNames();

        void Add(RoleName name);
        void Add(Role role);
        void Delete(int id);
        void Update(Role role);
    }
}

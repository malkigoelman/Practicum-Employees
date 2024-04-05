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
       Task<IEnumerable<Role>> GetAsync();
       Task<IEnumerable<RoleName>> GetRoleNamesAsync();
       Task AddAsync(RoleName name);
       Task AddAsync(Role role);
       Task DeleteAsync(int id);
       Task UpdateAsync(Role role);
    }
}

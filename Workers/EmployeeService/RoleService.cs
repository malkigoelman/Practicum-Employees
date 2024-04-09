using Employee.Core.Models;
using Employee.Core.Repositories;
using Employee.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Workers.Core.Models;

namespace Employee.Service
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task AddAsync(Role role) => await _roleRepository.AddAsync(role);

        public async Task AddAsync(RoleName name) => await _roleRepository.AddAsync(name);

        public async Task DeleteAsync(int id) => await _roleRepository.DeleteAsync(id);

        public async Task<IEnumerable<Role>> GetAsync() => await _roleRepository.GetAsync();

        public async Task<IEnumerable<RoleName>> GetRoleNamesAsync() => await _roleRepository.GetRoleNamesAsync();

        public async Task UpdateAsync(Role role) => await _roleRepository.UpdateAsync(role);
    }
}

using Employee.Core.Models;
using Employee.Core.Repositories;
using Employee.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public void Add(Role role)
        {
            _roleRepository.Add(role);
        }

        public void Add(RoleName name)
        {
            _roleRepository.Add(name);
        }

        public void Delete(int id)
        {
            _roleRepository.Delete(id);
        }

        public IEnumerable<Role> Get()
        {
            return _roleRepository.Get();
        }

        public IEnumerable<RoleName> GetRoleNames()
        {
            return _roleRepository.GetRoleNames();
        }

        public void Update(Role role)
        {
            _roleRepository.Update(role);
        }
    }
}

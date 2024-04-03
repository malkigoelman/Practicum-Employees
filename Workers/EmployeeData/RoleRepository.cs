using Employee.Core.Models;
using Employee.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Models;
using Workers.Data;

namespace Employee.Data
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _dataContext;
        public RoleRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Add(RoleName name)
        {
        }
        public void Add(Role role)
        {
            _dataContext.Roles.Add(role);
        }
        public void Delete(int id)
        {
            var roleToDelete = _dataContext.Roles.FirstOrDefault(x => x.Id == id);
            if (roleToDelete != null)
            {
                _dataContext.Roles.Remove(roleToDelete);
                _dataContext.SaveChanges();
            }
        }

        public IEnumerable<Role> Get()
        {
            return _dataContext.Roles.ToList();
        }
        public IEnumerable<RoleName> GetRoleNames()
        {
            return _dataContext.RoleNames.ToList();
        }
        public void Update(Role role)
        {
            _dataContext.Roles.Update(role);
            _dataContext.SaveChanges();
        }
    }
}

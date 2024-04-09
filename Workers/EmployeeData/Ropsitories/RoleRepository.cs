using Employee.Core.Models;
using Employee.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Workers.Core.Models;

namespace Employee.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _dataContext;

        public RoleRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task AddAsync(RoleName name)
        {
            _dataContext.RoleNames.Add(name);
            await _dataContext.SaveChangesAsync();
        }

        public async Task AddAsync(Role role)
        {
            var existingRole = _dataContext.Roles.FirstOrDefault(r => r.Name == role.Name);
            if (existingRole == null)
                _dataContext.Roles.Add(role);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var roleToDelete = await _dataContext.Roles.FirstOrDefaultAsync(x => x.RoleId == id);
            if (roleToDelete != null)
            {
                _dataContext.Roles.Remove(roleToDelete);
                await _dataContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Role>> GetAsync() => await _dataContext.Roles.ToListAsync();

        public async Task<IEnumerable<RoleName>> GetRoleNamesAsync() => await _dataContext.RoleNames.ToListAsync();

        public async Task UpdateAsync(Role role)
        {
            _dataContext.Roles.Update(role);
            await _dataContext.SaveChangesAsync();
        }
    }
}

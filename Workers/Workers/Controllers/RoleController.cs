using AutoMapper;
using Employee.Core.Models;
using Employee.Core.Services;
using Employee.Service;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Workers.Core.Models;

namespace Employee.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        
        public RoleController(IRoleService roleService) => _roleService = roleService;
        
        [HttpGet]
        public async Task<IEnumerable<Role>> Get()=> await _roleService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> Get(int id)
        {
            var role = await _roleService.GetAsync();
            var foundRole = role.FirstOrDefault(r => r.EmployeeId == id);
            if (foundRole == null)
            {
                return NotFound();
            }
            return foundRole;
        }

        [HttpGet("GetRoleNames")]
        public async Task<IEnumerable<RoleName>> GetRoleNames() => await _roleService.GetRoleNamesAsync();

        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole([FromBody] Role role)
        {
            await _roleService.AddAsync(role);
            return CreatedAtAction(nameof(Get), new { id = role.EmployeeId }, role);
        }

        [HttpPost("AddRoleName")]
        public async Task<IActionResult> AddRoleName([FromBody] RoleName name)
        {
            await _roleService.AddAsync(name);
            return CreatedAtAction(nameof(GetRoleNames), new { id = name.Id }, name);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Role role)
        {
            if (id != role.EmployeeId)
            {
                return BadRequest();
            }
            await _roleService.UpdateAsync(role);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existingRole = await _roleService.GetAsync();
            var foundRole = existingRole.FirstOrDefault(r => r.EmployeeId == id);
            if (foundRole == null)
            {
                return NotFound();
            }
            await _roleService.DeleteAsync(id);
            return NoContent();
        }
    }
}

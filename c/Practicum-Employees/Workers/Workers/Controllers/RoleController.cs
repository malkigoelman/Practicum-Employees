using Employee.Core.Models;
using Employee.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Workers.Core.Models;

namespace Employee.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public IEnumerable<Role> Get()
        {
            return _roleService.Get();
        }

        [HttpGet("{id}")]
        public ActionResult<Role> Get(int id)
        {
            var role = _roleService.Get().FirstOrDefault(r => r.Id == id);
            if (role == null)
            {
                return NotFound();
            }
            return role;
        }

        [HttpPost("AddRole")]
        public IActionResult AddRole([FromBody] Role role)
        {
            _roleService.Add(role);
            return CreatedAtAction(nameof(Get), new { id = role.Id }, role);
        }

        [HttpPost("AddRoleName")]
        public IActionResult AddRoleName([FromBody] RoleName name)
        {
            _roleService.Add(name);
            return CreatedAtAction(nameof(GetRoleNames), new { id = name.Id }, name);
        }

        [HttpGet("GetRoleNames")]
        public IEnumerable<RoleName> GetRoleNames()
        {
            return _roleService.GetRoleNames();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Role role)
        {
            if (id != role.Id)
            {
                return BadRequest();
            }
            _roleService.Update(role);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingRole = _roleService.Get().FirstOrDefault(r => r.Id == id);
            if (existingRole == null)
            {
                return NotFound();
            }
            _roleService.Delete(id);
            return NoContent();
        }
    }
}
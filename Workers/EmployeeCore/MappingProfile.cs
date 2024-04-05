using AutoMapper;
using Employee.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers;
using Workers.Core.Models;

namespace Employee.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Worker,EmployeeDto>().ReverseMap();
            CreateMap<Role,RoleDto>().ReverseMap();
        }
    }
}

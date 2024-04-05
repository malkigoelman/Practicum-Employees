using AutoMapper;
using Employee.Api.Models;
using Workers;
using Workers.Core.Models;

namespace Employee.Api
{
    public class ApiMappingProfile:Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<Worker,EmployeePostModel>().ReverseMap();
            CreateMap<Role, RolePostModel>().ReverseMap();
        }
    }
}

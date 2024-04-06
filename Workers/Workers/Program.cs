using Employee.Api;
using Employee.Core.Repositories;
using Employee.Core.Services;
using Employee.Core;
using Employee.Data.Ropsitories;
using Employee.Service;
using System.Text.Json.Serialization;
using Workers.Core.Repositories;
using Workers.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:4200") // מקורות מורשים
            .AllowAnyMethod() // אפשר כל מתודה (GET, POST, PUT, DELETE וכו')
            .AllowAnyHeader() // אפשר כל כותרת
            .AllowCredentials()); // אפשר קובצי Cookie מהמקור
});


builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext and repositories
builder.Services.AddDbContext<DataContext>();
builder.Services.AddScoped<IWorkerRepository, WorkerRepository>();
builder.Services.AddScoped<IWorkerService, WorkerService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(ApiMappingProfile), typeof(MappingProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();

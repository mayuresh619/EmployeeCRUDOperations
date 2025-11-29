using Microsoft.Data.SqlClient;
using ServiceApi.Helpers;
using ServiceApi.Service;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin() // Allows requests from all origins
                   .AllowAnyHeader() // Allows any header in the request
                   .AllowAnyMethod(); // Allows any HTTP method (GET, POST, PUT, DELETE, etc.)
        });
});

builder.Services.AddScoped<IDbConnection>(sp =>
    new SqlConnection(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IDatabaseHelpers, DatabaseHelpers>();
builder.Services.AddScoped<IEmployeeOperationsService, EmployeeOperationsService>();

var app = builder.Build();

app.UseCors(); // Use the default policy
// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();

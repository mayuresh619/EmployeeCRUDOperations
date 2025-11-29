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

var app = builder.Build();

app.UseCors(); // Use the default policy
// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();

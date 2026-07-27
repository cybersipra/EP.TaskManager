using EP.TaskManager.Application.Projects.Interfaces;
using EP.TaskManager.Application.Tasks.Interfaces;
using EP.TaskManager.Infrastructure.Persistence;
using EP.TaskManager.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EP.TaskManager.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<IProjectRepository, ProjectRepository>();

            services.AddScoped<ITaskRepository, TaskRepository>();

            return services;
        }
    }
}

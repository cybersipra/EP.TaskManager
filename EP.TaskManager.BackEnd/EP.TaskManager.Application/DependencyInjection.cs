using EP.TaskManager.Application.Projects.Interfaces;
using EP.TaskManager.Application.Projects.Services;
using EP.TaskManager.Application.Projects.Validators;
using EP.TaskManager.Application.Tasks.Interfaces;
using EP.TaskManager.Application.Tasks.Services;
using EP.TaskManager.Application.Tasks.Validators;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace EP.TaskManager.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(
            this IServiceCollection services)
        {
            services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ITaskService, TaskService>();
            return services;
        }
    }
}

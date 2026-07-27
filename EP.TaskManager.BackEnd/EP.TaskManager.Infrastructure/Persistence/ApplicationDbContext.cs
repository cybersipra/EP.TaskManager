using EP.TaskManager.Domain.Projects.Entities;
using EP.TaskManager.Domain.Tasks.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Infrastructure.Persistence
{
    public sealed class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> EP_TM_Project => Set<Project>();

        public DbSet<TaskItem> EP_TM_TaskItem => Set<TaskItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }
    }
}

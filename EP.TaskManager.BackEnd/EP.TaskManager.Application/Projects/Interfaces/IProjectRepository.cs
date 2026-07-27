using EP.TaskManager.Domain.Projects.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Projects.Interfaces
{
    public interface IProjectRepository
    {
        Task<List<Project>> GetAllAsync(CancellationToken cancellationToken);

        Task<Project?> GetByIdAsync(int id, CancellationToken cancellationToken);

        Task AddAsync(Project project, CancellationToken cancellationToken);

        void Update(Project project);

        void Delete(Project project);

        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}

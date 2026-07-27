using EP.TaskManager.Domain.Tasks.Entities;
using EP.TaskManager.Domain.Tasks.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Tasks.Interfaces
{
    public interface ITaskRepository
    {
        Task<List<TaskItem>> GetAllAsync(CancellationToken cancellationToken);

        Task<TaskItem?> GetByIdAsync(int id, CancellationToken cancellationToken);

        Task<List<TaskItem>> GetByProjectIdAsync(int projectId, CancellationToken cancellationToken);

        Task<List<TaskItem>> GetByStatusAsync(TaskItemStatus status, CancellationToken cancellationToken);

        Task AddAsync(TaskItem task, CancellationToken cancellationToken);

        void Update(TaskItem task);

        void Delete(TaskItem task);

        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}

using EP.TaskManager.Application.Common.Models;
using EP.TaskManager.Application.Tasks.DTOs;
using EP.TaskManager.Domain.Tasks.Entities;
using EP.TaskManager.Domain.Tasks.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Tasks.Interfaces
{
    public interface ITaskService
    {
        Task<Result<List<TaskDto>>> GetAllAsync(CancellationToken cancellationToken);

        Task<Result<TaskDto>> GetByIdAsync(int id, CancellationToken cancellationToken);

        Task<Result<List<TaskDto>>> GetByProjectAsync(int projectId, CancellationToken cancellationToken);

        Task<Result<List<TaskDto>>> GetByStatusAsync(TaskItemStatus status, CancellationToken cancellationToken);

        Task<Result<TaskDto>> CreateAsync(SaveTaskDto dto, CancellationToken cancellationToken);

        Task<Result<bool>> UpdateAsync(SaveTaskDto dto, CancellationToken cancellationToken);

        Task<Result<bool>> DeleteAsync(int id, CancellationToken cancellationToken);

        Task<Result<bool>> UpdateStatusAsync(int id, TaskItemStatus status, CancellationToken cancellationToken);
    }
}

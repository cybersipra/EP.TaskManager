using EP.TaskManager.Application.Common.Models;
using EP.TaskManager.Application.Projects.Interfaces;
using EP.TaskManager.Application.Tasks.DTOs;
using EP.TaskManager.Application.Tasks.Extensions;
using EP.TaskManager.Application.Tasks.Interfaces;
using EP.TaskManager.Domain.Tasks.Entities;
using EP.TaskManager.Domain.Tasks.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Tasks.Services
{
    public sealed class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IProjectRepository _projectRepository;

        public TaskService(ITaskRepository taskRepository, IProjectRepository projectRepository)
        {
            _taskRepository = taskRepository;
            _projectRepository = projectRepository;
        }

        public async Task<Result<List<TaskDto>>> GetAllAsync(CancellationToken cancellationToken)
        {
            var tasks = await _taskRepository.GetAllAsync(cancellationToken);

            return Result<List<TaskDto>>.Ok(TaskMap.ToDto(tasks), "Tasks retrieved successfully.");

        }

        public async Task<Result<TaskDto>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var task = await _taskRepository.GetByIdAsync(id, cancellationToken);

            if (task == null)
            {
                return Result<TaskDto>.Fail("Task not found.");
            }

            return Result<TaskDto>.Ok(TaskMap.ToDto(task), "Task retrieved successfully.");
        }

        public async Task<Result<List<TaskDto>>> GetByProjectAsync(int projectId, CancellationToken cancellationToken)
        {
            var project = await _projectRepository.GetByIdAsync(projectId, cancellationToken);

            if (project == null)
            {
                return Result<List<TaskDto>>.Fail("Project not found.");
            }

            var tasks = await _taskRepository.GetByProjectIdAsync(projectId, cancellationToken);

            return Result<List<TaskDto>>.Ok(TaskMap.ToDto(tasks), "Project tasks retrieved successfully.");
        }

        public async Task<Result<List<TaskDto>>> GetByStatusAsync(TaskItemStatus status, CancellationToken cancellationToken)
        {
            var tasks = await _taskRepository.GetByStatusAsync(status, cancellationToken);

            return Result<List<TaskDto>>.Ok(TaskMap.ToDto(tasks), "Tasks filtered successfully.");
        }

        public async Task<Result<TaskDto>> CreateAsync(SaveTaskDto dto, CancellationToken cancellationToken)
        {
            var project = await _projectRepository.GetByIdAsync(dto.ProjectId, cancellationToken);

            if (project == null)
            {
                return Result<TaskDto>.Fail("Project not found.");
            }

            var task = new TaskItem(dto.Title, dto.Description, dto.DueDate, dto.ProjectId, dto.Status);

            await _taskRepository.AddAsync(task, cancellationToken);

            await _taskRepository.SaveChangesAsync(cancellationToken);

            return Result<TaskDto>.Ok(TaskMap.ToDto(task), "Task created successfully.");
        }

        public async Task<Result<bool>> UpdateAsync(SaveTaskDto dto, CancellationToken cancellationToken)
        {
            var task = await _taskRepository.GetByIdAsync((int)dto.Id, cancellationToken);

            if (task == null)
            {
                return Result<bool>.Fail("Task not found.");
            }

            task.Update(dto.Title, dto.Description, dto.DueDate, dto.ProjectId, dto.Status);

            _taskRepository.Update(task);

            await _taskRepository.SaveChangesAsync(cancellationToken);

            return Result<bool>.Ok(true, "Task updated successfully.");
        }

        public async Task<Result<bool>> DeleteAsync(int id, CancellationToken cancellationToken)
        {
            var task = await _taskRepository.GetByIdAsync(id, cancellationToken);

            if (task == null)
            {
                return Result<bool>.Fail("Task not found.");
            }

            _taskRepository.Delete(task);

            await _taskRepository.SaveChangesAsync(cancellationToken);

            return Result<bool>.Ok(true,"Task deleted successfully.");
        }
        public async Task<Result<bool>> UpdateStatusAsync(int id, TaskItemStatus status, CancellationToken cancellationToken)
        {
            var task = await _taskRepository.GetByIdAsync(id, cancellationToken);

            if (task == null)
            {
                return Result<bool>.Fail("Task not found.");
            }

            task.ChangeStatus(status);

            _taskRepository.Update(task);

            await _taskRepository.SaveChangesAsync(cancellationToken);

            return Result<bool>.Ok(true, "Task Status updated successfully.");
        }
    }
}

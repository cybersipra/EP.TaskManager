using EP.TaskManager.Application.Projects.DTOs;
using EP.TaskManager.Application.Tasks.DTOs;
using EP.TaskManager.Domain.Projects.Entities;
using EP.TaskManager.Domain.Tasks.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Tasks.Extensions
{
    public static class TaskMap
    {
        public static TaskDto ToDto(TaskItem task)
        {
            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Status = task.Status,
                DueDate = task.DueDate,
                ProjectId = task.ProjectId
            };
        }

        public static List<TaskDto> ToDto(IEnumerable<TaskItem> tasks)
        {
            return tasks
                .Select(t => ToDto(t))
                .ToList();
        }
    }
}

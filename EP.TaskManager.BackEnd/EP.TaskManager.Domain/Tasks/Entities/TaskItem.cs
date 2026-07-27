using EP.TaskManager.Domain.Common;
using EP.TaskManager.Domain.Projects.Entities;
using EP.TaskManager.Domain.Tasks.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Domain.Tasks.Entities
{
    public class TaskItem : BaseEntity
    {
        private TaskItem()
        {
        }

        public TaskItem(string title, string? description, DateTime dueDate, int projectId, TaskItemStatus status)
        {
            Title = title;
            Description = description;
            DueDate = dueDate;
            ProjectId = projectId;
            Status = status;
            CreatedAt = DateTime.UtcNow;
        }
        public string Title { get; private set; }
            = string.Empty;
        public string? Description { get; private set; }
        public TaskItemStatus Status { get; private set; }
        public DateTime DueDate { get; private set; }
        public int ProjectId { get; private set; }
        public Project Project { get; private set; } = null!;

        public void Update(string title, string? description, DateTime dueDate, int projectId, TaskItemStatus status)
        {
            Title = title;
            Description = description;
            DueDate = dueDate;
            ProjectId = projectId;
            Status = status;
            UpdatedAt = DateTime.UtcNow;
        }
        public void ChangeStatus(TaskItemStatus status)
        {
            Status = status;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}

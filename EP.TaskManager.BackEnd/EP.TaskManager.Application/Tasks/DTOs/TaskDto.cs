using EP.TaskManager.Domain.Tasks.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Tasks.DTOs
{
    public class TaskDto
    {
        public int? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public TaskItemStatus? Status { get; set; }
        public DateTime? DueDate { get; set; }
        public int? ProjectId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
    public class SaveTaskDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public TaskItemStatus Status { get; set; }
        public DateTime DueDate { get; set; }
        public int ProjectId { get; set; }
    }
}

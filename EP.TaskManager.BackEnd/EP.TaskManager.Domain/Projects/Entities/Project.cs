using EP.TaskManager.Domain.Common;
using EP.TaskManager.Domain.Tasks.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Domain.Projects.Entities
{
    public class Project : BaseEntity
    {
        private Project()
        {
        }


        public Project(string name, string? description)
        {
            Name = name;
            Description = description;
            CreatedAt = DateTime.UtcNow;
        }
        public string Name { get; private set; } = string.Empty;
        public string? Description { get; private set; }
        public ICollection<TaskItem> Tasks { get; private set; }
            = new List<TaskItem>();
        
        public void Update(string name, string? description)
        {
            Name = name;
            Description = description;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}

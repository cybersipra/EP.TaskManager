using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Projects.DTOs
{
    public class ProjectDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
    public class SaveProjectDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}

using EP.TaskManager.Application.Projects.DTOs;
using EP.TaskManager.Domain.Projects.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Projects.Extensions
{
    public static class ProjectMap
    {
        public static ProjectDto ToDto(Project project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                CreatedAt = project.CreatedAt,
                UpdatedAt = project.UpdatedAt
            };
        }

        public static List<ProjectDto> ToDto(IEnumerable<Project> projects)
        {
            return projects
                .Select(p => ToDto(p))
                .ToList();
        }
    }
}

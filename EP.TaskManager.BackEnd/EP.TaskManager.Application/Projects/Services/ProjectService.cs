using EP.TaskManager.Application.Common.Models;
using EP.TaskManager.Application.Projects.DTOs;
using EP.TaskManager.Application.Projects.Extensions;
using EP.TaskManager.Application.Projects.Interfaces;
using EP.TaskManager.Domain.Projects.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Projects.Services
{
    public sealed class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<Result<List<ProjectDto>>> GetAllAsync(CancellationToken cancellationToken)
        {
            var projects = await _projectRepository.GetAllAsync(cancellationToken);
            var result = ProjectMap.ToDto(projects);
            return Result<List<ProjectDto>>.Ok(result, "Projects retrieved successfully.");
        }

        public async Task<Result<ProjectDto>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var project = await _projectRepository.GetByIdAsync(id, cancellationToken);

            if (project == null)
            {
                return Result<ProjectDto>.Fail("Project not found.");
            }

            return Result<ProjectDto>.Ok(ProjectMap.ToDto(project), "Project retrieved successfully.");
        }

        public async Task<Result<ProjectDto>> CreateAsync(SaveProjectDto dto, CancellationToken cancellationToken)
        {
            var project = new Project(dto.Name, dto.Description);

            await _projectRepository.AddAsync(project, cancellationToken);

            await _projectRepository.SaveChangesAsync(cancellationToken);

            return Result<ProjectDto>.Ok(ProjectMap.ToDto(project), "Project created successfully.");
        }

        public async Task<Result<bool>> UpdateAsync(SaveProjectDto dto, CancellationToken cancellationToken)
        {
            var project = await _projectRepository.GetByIdAsync((int)dto.Id, cancellationToken);

            if (project == null)
            {
                return Result<bool>.Fail("Project not found.");
            }

            project.Update(dto.Name, dto.Description);

            _projectRepository.Update(project);

            await _projectRepository.SaveChangesAsync(cancellationToken);

            return Result<bool>.Ok(true, "Project updated successfully.");
        }

        public async Task<Result<bool>> DeleteAsync(int id, CancellationToken cancellationToken)
        {
            var project = await _projectRepository.GetByIdAsync(id, cancellationToken);

            if (project == null)
            {
                return Result<bool>.Fail("Project not found.");
            }

            _projectRepository.Delete(project);

            await _projectRepository.SaveChangesAsync(cancellationToken);

            return Result<bool>.Ok(true, "Project deleted successfully.");
        }
    }
}

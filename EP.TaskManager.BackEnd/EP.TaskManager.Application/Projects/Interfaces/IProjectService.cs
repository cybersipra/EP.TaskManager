using EP.TaskManager.Application.Common.Models;
using EP.TaskManager.Application.Projects.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Projects.Interfaces
{
    public interface IProjectService
    {
        Task<Result<List<ProjectDto>>> GetAllAsync(CancellationToken cancellationToken);

        Task<Result<ProjectDto>> GetByIdAsync(int id, CancellationToken cancellationToken);

        Task<Result<ProjectDto>> CreateAsync(SaveProjectDto dto, CancellationToken cancellationToken);

        Task<Result<bool>> UpdateAsync(SaveProjectDto dto, CancellationToken cancellationToken);

        Task<Result<bool>> DeleteAsync(int id, CancellationToken cancellationToken);
    }
}

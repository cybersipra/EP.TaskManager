using EP.TaskManager.Application.Tasks.DTOs;
using EP.TaskManager.Application.Tasks.Interfaces;
using EP.TaskManager.Domain.Tasks.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EP.TaskManager.API.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _service;

        public TaskController(ITaskService service)
        {
            _service = service;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            return Ok(await _service.GetAllAsync(cancellationToken));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        {
            var result = await _service.GetByIdAsync(id, cancellationToken);

            if (!result.Success) return NotFound(result);

            return Ok(result);
        }

        [HttpGet("project/{projectId:int}")]
        public async Task<IActionResult> GetByProject(int projectId, CancellationToken cancellationToken)
        {
            return Ok(await _service.GetByProjectAsync(projectId, cancellationToken));
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetByStatus(TaskItemStatus status, CancellationToken cancellationToken)
        {
            return Ok(await _service.GetByStatusAsync(status, cancellationToken));
        }

        // Single save endpoint: creates when dto.Id is null/0, otherwise updates
        [HttpPost("save")]
        public async Task<IActionResult> Save(SaveTaskDto dto, CancellationToken cancellationToken)
        {
            if (dto == null) return BadRequest();

            if (!dto.Id.HasValue || dto.Id == 0)
            {
                return Ok(await _service.CreateAsync(dto, cancellationToken));
            }

            var result = await _service.UpdateAsync(dto, cancellationToken);

            if (!result.Success) return NotFound(result);

            return Ok(result);
        }

        [HttpPatch("updatestatus/{id:int}")]
        public async Task<IActionResult> UpdateStatus(int id, TaskItemStatus status, CancellationToken cancellationToken)
        {
            var result = await _service.UpdateStatusAsync(id, status, cancellationToken);

            if (!result.Success) return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            var result = await _service.DeleteAsync(id, cancellationToken);

            if (!result.Success) return NotFound(result);

            return Ok(result);
        }
    }
}

using EP.TaskManager.Application.Projects.DTOs;
using EP.TaskManager.Application.Projects.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EP.TaskManager.API.Controllers
{
    [Route("api/project")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _service;

        public ProjectController(IProjectService service)
        {
            _service = service;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var result = await _service.GetAllAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        {
            var result = await _service.GetByIdAsync(id, cancellationToken);

            if (!result.Success) return NotFound(result);

            return Ok(result);
        }

        // Single save endpoint: creates when dto.Id is null/0, otherwise updates
        [HttpPost("save")]
        public async Task<IActionResult> Save(SaveProjectDto dto, CancellationToken cancellationToken)
        {
            if (dto == null) return BadRequest();

            if (!dto.Id.HasValue || dto.Id == 0)
            {
                var createResult = await _service.CreateAsync(dto, cancellationToken);
                return Ok(createResult);
            }

            var updateResult = await _service.UpdateAsync(dto, cancellationToken);
            if (!updateResult.Success) return NotFound(updateResult);

            return Ok(updateResult);
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

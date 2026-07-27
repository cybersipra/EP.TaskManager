using EP.TaskManager.Application.Common.Models;
using System.Net;
using System.Text.Json;

namespace EP.TaskManager.API.Middlewares
{
    public sealed class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception");

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                context.Response.ContentType = "application/json";

                var response = ApiResponse<string>.Failure("Internal server error");

                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
        }
    }
}

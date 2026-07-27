using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EP.TaskManager.API.Filters
{
    public class ValidationFilter : IAsyncActionFilter
    {
        private readonly IServiceProvider _serviceProvider;

        public ValidationFilter(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            foreach (var argument in context.ActionArguments.Values)
            {
                if (argument == null) continue;

                var validatorType = typeof(IValidator<>).MakeGenericType(argument.GetType());

                var validator = _serviceProvider.GetService(validatorType);

                if (validator == null) continue;

                var validationResult = await ((IValidator)validator).ValidateAsync(new ValidationContext<object>(argument));

                if (!validationResult.IsValid)
                {
                    context.Result =
                        new BadRequestObjectResult(
                            new
                            {
                                Success = false,
                                Errors = validationResult.Errors.Select(x => x.ErrorMessage)
                            }
                        );
                    return;
                }
            }

            await next();
        }
    }
}

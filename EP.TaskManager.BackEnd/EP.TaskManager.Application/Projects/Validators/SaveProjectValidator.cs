using EP.TaskManager.Application.Projects.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Projects.Validators
{
    public class SaveProjectValidator
    : AbstractValidator<SaveProjectDto>
    {
        public SaveProjectValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Project Name is required.")
                .MaximumLength(100)
                .WithMessage("Project Name cannot exceed 100 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(500)
                .WithMessage("Project Description cannot exceed 500 characters.");
        }
    }
}

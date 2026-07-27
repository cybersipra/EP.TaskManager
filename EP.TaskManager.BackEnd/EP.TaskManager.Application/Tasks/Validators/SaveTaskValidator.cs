using EP.TaskManager.Application.Tasks.DTOs;
using EP.TaskManager.Domain.Tasks.Enums;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Tasks.Validators
{
    public class SaveTaskValidator
    : AbstractValidator<SaveTaskDto>
    {
        public SaveTaskValidator()
        {
            RuleFor(x => x.Title)
             .NotEmpty()
             .WithMessage("Task title is required.")
             .MaximumLength(150)
             .WithMessage("Task title cannot exceed 150 characters.");


            RuleFor(x => x.Description)
                .MaximumLength(500)
                .WithMessage("Description cannot exceed 500 characters.");


            RuleFor(x => x.DueDate)
                .NotEmpty()
                .GreaterThan(DateTime.UtcNow)
                .WithMessage("Due date must be in the future.");


            RuleFor(x => x.Status)
                .IsInEnum()
                .WithMessage("Invalid task status.");

            RuleFor(x => x.ProjectId)
                .GreaterThan(0)
                .WithMessage("Please select a project to create a task.");
        }
    }
}

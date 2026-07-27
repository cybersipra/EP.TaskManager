using EP.TaskManager.Application.Tasks.Interfaces;
using EP.TaskManager.Domain.Tasks.Entities;
using EP.TaskManager.Domain.Tasks.Enums;
using EP.TaskManager.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Infrastructure.Repositories
{
    public sealed class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _context;

        public TaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskItem>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _context.EP_TM_TaskItem.AsNoTracking().OrderBy(x => x.DueDate).ToListAsync(cancellationToken);
        }

        public async Task<TaskItem?> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await _context.EP_TM_TaskItem.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<List<TaskItem>> GetByProjectIdAsync(int projectId, CancellationToken cancellationToken)
        {
            return await _context.EP_TM_TaskItem.AsNoTracking().Where(x => x.ProjectId == projectId).OrderBy(x => x.DueDate).ToListAsync(cancellationToken);
        }

        public async Task<List<TaskItem>> GetByStatusAsync(TaskItemStatus status, CancellationToken cancellationToken)
        {
            return await _context.EP_TM_TaskItem.AsNoTracking().Where(x => x.Status == status).OrderBy(x => x.DueDate).ToListAsync(cancellationToken);
        }

        public async Task AddAsync(TaskItem task, CancellationToken cancellationToken)
        {
            await _context.EP_TM_TaskItem.AddAsync(task, cancellationToken);
        }

        public void Update(TaskItem task)
        {
            _context.EP_TM_TaskItem.Update(task);
        }

        public void Delete(TaskItem task)
        {
            _context.EP_TM_TaskItem.Remove(task);
        }
        public async Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}

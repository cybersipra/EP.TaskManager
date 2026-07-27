using EP.TaskManager.Application.Projects.Interfaces;
using EP.TaskManager.Domain.Projects.Entities;
using EP.TaskManager.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Infrastructure.Repositories
{
    public sealed class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Project>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _context.EP_TM_Project.AsNoTracking().OrderBy(x => x.Name).ToListAsync(cancellationToken);
        }

        public async Task<Project?> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await _context.EP_TM_Project.Include(x => x.Tasks).FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public async Task AddAsync(Project project, CancellationToken cancellationToken)
        {
            await _context.EP_TM_Project.AddAsync(project, cancellationToken);
        }

        public void Update(Project project)
        {
            _context.EP_TM_Project.Update(project);
        }

        public void Delete(Project project)
        {
            _context.EP_TM_Project.Remove(project);
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Smoke.Models;

namespace Smoke.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options){}

        public DbSet<Game> SmokeDB { get; set; }
    }
}
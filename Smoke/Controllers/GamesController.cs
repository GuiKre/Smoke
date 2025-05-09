using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smoke.Data;
using Smoke.Models;

namespace Smoke.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public GamesController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddGame(Game game)
        {
            _appDbContext.SmokeDB.Add(game);
            await _appDbContext.SaveChangesAsync();

            return Ok(game);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGame()
        {
            var games = await _appDbContext.SmokeDB.ToListAsync();

            return Ok(games);
        }
    }
}
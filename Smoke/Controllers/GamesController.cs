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

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGameById(int id)
        {
            var game = await _appDbContext.SmokeDB.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return Ok(game);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGame(int id, [FromBody] Game updatedGame)
        {
            
            var existingGame = await _appDbContext.SmokeDB.FindAsync(id);

            if (existingGame == null)
            {
                return NotFound("Jogo não encontrado!");
            }

            _appDbContext.Entry(existingGame).CurrentValues.SetValues(updatedGame);

            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, updatedGame);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var game = await _appDbContext.SmokeDB.FindAsync(id);

            if (game == null)
            {
                return NotFound("Jogo não encontrado");
            }

            _appDbContext.SmokeDB.Remove(game);

            await _appDbContext.SaveChangesAsync();

            return Ok("Jogo deletado!");
        }

    }
}
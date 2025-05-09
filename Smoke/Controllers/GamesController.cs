using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Smoke.Data;

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
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        [HttpGet]
        //[Authorize]
        public IActionResult Get()
        {
            var pokemons = new[]
                    {
                        new { name = "jamiesaur", url = "https://pokeapi.co/api/v2/pokemon/1/", id = "d254" },
                        new { name = "ivysaur", url = "https://pokeapi.co/api/v2/pokemon/2/", id = "2c3e" },
                        new { name = "venusaur", url = "https://pokeapi.co/api/v2/pokemon/3/", id = "1806" },
                        new { name = "charmander", url = "https://pokeapi.co/api/v2/pokemon/4/", id = "4f31" },
                        new { name = "charmeleon", url = "https://pokeapi.co/api/v2/pokemon/5/", id = "12ea" },
                        new { name = "charizard", url = "https://pokeapi.co/api/v2/pokemon/6/", id = "e875" },
                        new { name = "squirtle", url = "https://pokeapi.co/api/v2/pokemon/7/", id = "8fdd" },
                        new { name = "wartortle", url = "https://pokeapi.co/api/v2/pokemon/8/", id = "6ae7" }
                    };

            return Ok(pokemons); 
        }
    }
}

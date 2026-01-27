using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ContentService _contentService;

        public ProjectsController(ContentService contentService)
        {
            _contentService = contentService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var projects = _contentService.GetAll()
                                .Where(p => !p.Meta.IsSeries)
                                .Select(p => new { p.Slug, p.Meta });
            return Ok(projects);
        }

        [HttpGet]
        [Route("series/{slug}")]
        public IActionResult GetBySeries(string slug)
        {
            var projects = _contentService.GetBySeries(slug)
                                .Select(p => new { p.Slug, p.Meta });
            return Ok(projects);
        }

        [HttpGet]
        [Route("{slug}")]
        public IActionResult Get(string slug)
        {
            var projects = _contentService.Get(slug);
            return Ok(projects);
        }

        [HttpGet]
        [Route("categories")]
        public IActionResult Categories()
        {
            var results = _contentService.Categories();
            return Ok(results);
        }

        [HttpGet]
        [Route("industries")]
        public IActionResult Industries()
        {
            var results = _contentService.Industries();
            return Ok(results);
        }

        [HttpGet]
        [Route("difficulty-levels")]
        public IActionResult DifficultyLevels()
        {
            var results = _contentService.Difficulty();
            return Ok(results);
        }
    }
}

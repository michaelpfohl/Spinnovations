using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Spinnovations.Data;

namespace Spinnovations.Controllers
{
    [ApiController]
    [Route("api/Product")]
    public class ProductController : ControllerBase
    {
        ProductRepository _repo;

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_repo.GetAll());
        }
    }
}

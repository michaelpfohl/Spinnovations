using Microsoft.AspNetCore.Mvc;
using Spinnovations.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Spinnovations.Controllers
{
    [Route("api/Order_Details")]
    [ApiController]
    public class Order_DetailsController : ControllerBase
    {
        Order_DetailsRepository _repo;
        public Order_DetailsController(Order_DetailsRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public IActionResult GetAllOrder_Details()
        {
            return Ok(_repo.GetAll());
        }

    }
}

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
    [Route("api/paymentInfo")]
    public class PaymentInfoController : ControllerBase
    {
        PaymentInfoRepository _repo;

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_repo.GetAll());
        }
    }
}

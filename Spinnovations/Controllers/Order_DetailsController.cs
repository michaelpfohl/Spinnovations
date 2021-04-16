using Microsoft.AspNetCore.Mvc;
using Spinnovations.Data;
using Spinnovations.Models;
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
        [HttpGet("{id}")]
        public IActionResult GetOrder_Details(int id)
        {
            var Order_Details = _repo.GetIndividual(id);
            if (Order_Details == null)
            {
                return NotFound("No Order Details found with that Id");
            }
            return Ok(Order_Details);
        }
        [HttpPost]
        public IActionResult AddOrder_Details(Order_Details orderDetails)
        {
            _repo.Add(orderDetails);
            return Created($"/api/order_details/{orderDetails.Id}", orderDetails);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder_Details(int id)
        {
            _repo.Delete(id);
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult UpdateOrder_Details(Order_Details orderDetails)
        {
            _repo.Update(orderDetails);
            return Ok();
        }
    }
}

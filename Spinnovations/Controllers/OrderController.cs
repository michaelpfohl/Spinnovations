using Microsoft.AspNetCore.Mvc;
using Spinnovations.Data;
using Spinnovations.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Spinnovations.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrderRepository _repo;
        public OrderController(OrderRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public IActionResult GetAllOrders()
        {
            return Ok(_repo.GetAll());
        }
        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var Order = _repo.GetIndividual(id);
            if (Order == null)
            {
                return NotFound("No Orders found with that Id");
            }
            return Ok(Order);
        }
        [HttpGet("user/{customerId}")]
        public IActionResult GetOrderByUser(int customerId)
        {
            return Ok(_repo.GetByUser(customerId));
        }
        [HttpPost]
        public IActionResult AddOrder_Details(Order order)
        {
            _repo.Add(order);
            return Created($"/api/order_details/{order.Id}", order);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            _repo.Delete(id);
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult UpdateOrder(Order order)
        {
            _repo.Update(order);
            return Ok();
        }
    }
}


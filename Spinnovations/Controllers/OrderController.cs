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
    public class OrderController : FirebaseEnabledController
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
            return Ok(_repo.GetAllOrdersByUser(customerId)) ;
        }

        [HttpGet("user/last/{customerId}")]
        public IActionResult GetMostRecentUserOrder(int customerId)
        {
            return Ok(_repo.GetMostRecentUserOrder(customerId));
        }

        [HttpGet("sales/{creatorId}")]
        public IActionResult GetOrderByCreator(int creatorId)
        {
            return Ok(_repo.GetAllOrdersByCreator(creatorId));
        }

        [HttpGet("shipped/{creatorId}")]
        public IActionResult GetAllOrdersShipped(int creatorId)
        {
            return Ok(_repo.GetAllOrdersShipped(creatorId));
        }

        [HttpGet("to-be-shipped/{creatorId}")]
        public IActionResult GetAllOrdersNotYetShipped(int creatorId)
        {
            return Ok(_repo.GetAllOrdersNotYetShipped(creatorId));
        }

        [HttpGet("sales/total/{creatorId}")]
        public IActionResult GetTotalCreatorSales(int creatorId)
        {
            return Ok(_repo.GetTotalCreatorSales(creatorId));
        }

        [HttpGet("sales/average/{creatorId}")]
        public IActionResult GetAverageProductSoldPrice(int creatorId)
        {
            return Ok(_repo.GetAverageProductSoldPrice(creatorId));
        }

        [HttpGet("sales/last30/{creatorId}")]
        public IActionResult GetTotalCreatorSalesLastMonth(int creatorId)
        {
            return Ok(_repo.GetTotalCreatorSalesLastMonth(creatorId));
        }


        [HttpPost]
        public IActionResult AddOrder(Order order)
        {
            _repo.Add(order);
            return Created($"/api/orders/{order.Id}", order);
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


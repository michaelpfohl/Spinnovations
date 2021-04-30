using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Spinnovations.Data;
using Spinnovations.Models;

namespace Spinnovations.Controllers
{
    [ApiController]
    [Route("api/Products")]
    public class ProductController : FirebaseEnabledController
    {
        ProductRepository _repo;

        public ProductController(ProductRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _repo.Get(id);
            if (product == null)
            {
                return NotFound("This product does not exist");
            }
            return Ok(product);
        }

        [HttpGet("last20")]
        public IActionResult GetLast20()
        {
            var products = _repo.GetLast20();
            if (products == null)
            {
                return NotFound("There are no new products.");
            }
            return Ok(products);
        }

        [HttpGet("category/{id}")]
        public IActionResult GetProductsInCategory(int id)
        {
            return Ok(_repo.GetProductsInCategory(id));
        }

        [HttpPost]
        public IActionResult AddNewProduct(Product product)
        {
            _repo.Add(product);
            return Created($"api/Products/{product.Id}", product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(Product product)
        {
            _repo.Update(product);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _repo.Delete(id);
            return Ok();
        }

    }
}

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

        [HttpGet("seller/{creatorId}")]
        public IActionResult GetProductsByCreatorId(int creatorId)
        {
            return Ok(_repo.GetProductsByCreatorId(creatorId));
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

        [HttpPut("delete/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _repo.DeleteProduct(id);
            return Ok();
        }

        [HttpPut("deleteByCreator/{creatorId}")]
        public IActionResult DeleteProductsByCreator(int creatorId)
        {
            _repo.DeleteProductsByCreator(creatorId);
            return Ok();
        }

        [HttpGet("search/{term}")]
        public IActionResult Search(string term)
        {
            var results = _repo.Search(term);
            return Ok(results);
        }

    }
}

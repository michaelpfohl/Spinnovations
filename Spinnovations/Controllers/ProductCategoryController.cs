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
    [Route("api/Product_Category")]
    public class ProductCategoryController : FirebaseEnabledController
    {
        ProductCategoryRepository _repo;

        public ProductCategoryController(ProductCategoryRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("With_Products")]
        public IActionResult GetAllCategoriesWithProducts()
        {
            return Ok(_repo.GetAllCategoriesWithProducts());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var productCategory = _repo.Get(id);
            if (productCategory == null)
            {
                return NotFound("This product category does not exist");
            }
            return Ok(productCategory);
        }

        [HttpPost]
        public IActionResult AddNewProductCategory(ProductCategory pc)
        {
            _repo.Add(pc);
            return Created($"api/Product_Category/{pc.Id}", pc);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProductCategory(ProductCategory pc)
        {
            _repo.Update(pc);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repo.Delete(id);
            return Ok();
        }

        [HttpGet("totals/{creatorId}")]
        public IActionResult GetQuantityByCategory(int creatorId)
        {
            return Ok(_repo.GetQuantityByCategory(creatorId));
        }
    }
}

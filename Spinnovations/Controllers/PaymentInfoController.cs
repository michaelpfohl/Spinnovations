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
    [Route("api/PaymentInformation")]
    public class PaymentInformationController : FirebaseEnabledController
    {
        PaymentInformationRepository _repo;

        public PaymentInformationController(PaymentInformationRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllPayments()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("myPayments/{custId}")]
        public IActionResult GetCustomersPayments(int custId)
        {
            var payment = _repo.GetUserPayments(custId);
            if (payment == null)
            {
                return NotFound("This customer has no payments ;_;");
            }
            return Ok(payment);
        }
        [HttpGet("{id}")]
        public IActionResult GetSinglePayment(int id)
        {
            var payment = _repo.Get(id);
            if (payment == null)
            {
                return NotFound("This payment information does not exist");
            }
            return Ok(payment);
        }

        [HttpPost]
        public IActionResult AddNewPayment(Payment_Info payment)
        {
            _repo.Add(payment);
            return Created($"api/PaymentInformation/{payment.Id}", payment);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePayment(Payment_Info payment)
        {
            _repo.Update(payment);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePayment(int id)
        {
            _repo.Delete(id);
            return Ok();
        }

    }
}

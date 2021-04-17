using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using Spinnovations.Models;

namespace Spinnovations.Data
{
    public class PaymentInformationRepository
    {
        readonly string ConnectionString;

        public PaymentInformationRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Spinnovations");
        }

        public List<Payment_Info> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM PaymentInfo";
            return db.Query<Payment_Info>(sql).ToList();
        }

        public Payment_Info Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM PaymentInfo WHERE Id = @id";
            var payment = db.QueryFirstOrDefault<Payment_Info>(sql, new { id = id });
            return payment;
        }

        public List<Payment_Info> GetUserPayments(int custId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM PaymentInfo WHERE PaymentInfo.Customer_Id = @custId";
            var payment = db.Query<Payment_Info>(sql, new { custId = custId }).ToList();
            return payment;
        }

        public void Add(Payment_Info payment)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"INSERT INTO [PaymentInfo]
                               ([Card_Company]
                               ,[Card_Number]
                               ,[Expiration_Month]
                               ,[Expiration_Year]
                               ,[CVV]
                               ,[Customer_Id])
                         VALUES (@Card_Company, @Card_Number, @Expiration_Month, @Expiration_Year, @CVV, @Customer_Id)";
            var id = db.ExecuteScalar<int>(sql, payment);
            payment.Id = id;
        }

        public void Update(Payment_Info payment)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE PaymentInfo
                        SET Card_Company = @card_Company,
                            Card_Number = @card_Number,
                            Expiration_Month = @expiration_Month,
                            Expiration_Year = @expiration_Year,
                            CVV = @cvv,
                            Customer_Id = @customer_Id
                        WHERE Id = @id";
            db.Execute(sql, payment);
        }

        public void Delete(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "DELETE FROM PaymentInfo WHERE Id = @id";
            db.Execute(sql, new { id = id });
        }
    }
}

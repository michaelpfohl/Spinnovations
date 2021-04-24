using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Spinnovations.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Spinnovations.Data
{
    public class OrderRepository
    {
        readonly string ConnectionString;
        public OrderRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Spinnovations");
        }
        public List<Order> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Orders";
            return db.Query<Order>(sql).ToList();
        }
        public Order GetIndividual(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"SELECT * FROM Orders 
                            WHERE Id = @id";
            return db.QueryFirstOrDefault<Order>(sql, new { id = id });
        }

        public List<Order> GetByUser(int customerId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"SELECT * from orders o
                            JOIN Order_Details od
                            ON od.Order_Id = o.Id
                            WHERE o.Customer_Id = @customerId";
            return db.Query<Order>(sql, new { customerId = customerId }).ToList();
        }
        public void Add(Order order)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"INSERT INTO [dbo].[Orders]
                            ([Customer_Id]
                            ,[Address]
                            ,[City]
                            ,[Country]
                            ,[Postal_Code])
                        VALUES
                            (@Customer_Id
                            ,@Address
                            ,@City
                            ,@Country
                            ,@Postal_Code)";
            var id = db.ExecuteScalar<int>(sql, order);
            order.Id = id;
        }
        public void Delete(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"DELETE from Orders
                        WHERE Id = @id";
            db.Execute(sql, new { id });
        }
        public void Update(Order order)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"UPDATE [dbo].[Orders]
                        SET [Customer_Id] = @Customer_Id
                            ,[Address] = @Address
                            ,[City] = @City
                            ,[Country] = @Country
                            ,[Postal_Code] = @Postal_Code
                        WHERE Id = @id";
            db.Execute(sql, order);
        }
    }
}

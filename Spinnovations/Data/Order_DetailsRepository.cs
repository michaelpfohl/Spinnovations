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
    public class Order_DetailsRepository
    {
        readonly string ConnectionString;
        public Order_DetailsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Spinnovations");
        }
        public List<Order_Details> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Order_Details";
            return db.Query<Order_Details>(sql).ToList();
        }
        public Order_Details GetIndividual(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"SELECT * FROM Order_Details 
                            WHERE Id = @id";
            return db.QueryFirstOrDefault<Order_Details>(sql, new { id = id });
        }
        public void Add(Order_Details orderDetails)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"INSERT INTO [dbo].[Order_Details]
                        ([Order_Id]
                        ,[Product_Id]
                        ,[Unit_Price]
                        ,[Quantity])
                    VALUES
                        (@Order_Id
                        ,@Product_Id
                        ,@Unit_Price
                        ,@Quantity)";
            var id = db.ExecuteScalar<int>(sql, orderDetails);
            orderDetails.Id = id;
        }
        public void Delete(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"DELETE from Order_Details
                        WHERE Id = @id";
            db.Execute(sql, new { id });
        }
        public void Update(Order_Details orderDetails)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"UPDATE [dbo].[Order_Details]
                        SET [Order_Id] = @Order_Id
                            ,[Product_Id] = @Product_Id
                            ,[Unit_Price] = @Unit_Price
                            ,[Quantity] = @Quantity
                        WHERE Id = @id";
            db.Execute(sql, orderDetails);
        }
        public void GetOrderDetailsByOrder(int orderId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"SELECT * from Order_Details
                         WHERE Order_Id = @orderId";
            db.Execute(sql, new { orderId = orderId });
        }
    }
}

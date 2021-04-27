using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Spinnovations.Models;
using Spinnovations.Data;
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

        public IEnumerable<Order> GetAllOrdersByUser(int customerId)
        {
            using var db = new SqlConnection(ConnectionString);
            //var sql = $@"SELECT * from Orders o
            //                JOIN Order_Details od 
            //                    ON od.Order_Id = o.id
            //                JOIN Products p
            //                    ON p.id = od.Product_Id
            //                WHERE o.Customer_Id = 4";
            //var userOrders = db.Query<Order, Order_Details, Product, Order>(sql, (order, order_details, product) =>
            //{
            //    order.Order_Details = new List<Order_Details>();
            //    order.Products = new List<Product>();
            //    order.Order_Details.Add(order_details);
            //    order.Products.Add(product);
            //    return order;
            //}, new { customerId = customerId }, splitOn: "Id");
            //return userOrders;
            var orderSql = $@"SELECT * from Orders o
                            WHERE o.Customer_Id = @customerId";
            var productSql = $@"SELECT * from Products p
                                WHERE p.Id = @productId";
            var orderDetailSql = $@"SELECT * from Order_Details
                         WHERE Order_Id = @orderId";

            var productIds = new List<int>();
            var orderIds = new List<int>();
            var orderDetails = new List<Order_Details>();
            var products = new List<Product>();

            var userOrders = db.Query<Order>(orderSql, new { customerId = customerId });

            foreach (var userOrder in userOrders)
            {
                orderIds.Add(userOrder.Id);
            }

            foreach (var orderId in orderIds)
            {
                orderDetails = db.Query<Order_Details>(orderDetailSql, new { orderId = orderId }).ToList();
            }

            foreach (var orderDetail in orderDetails)
            {
                productIds.Add(orderDetail.Product_Id);
            }

            foreach (var productId in productIds)
            {
                products = db.Query<Product>(productSql, new { productId = productId }).ToList();
            }

            
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

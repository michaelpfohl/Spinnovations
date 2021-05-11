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
            var sql = $@"SELECT * from Orders o
                            JOIN Order_Details od 
                                ON od.Order_Id = o.id
                            JOIN Products p
                                ON p.id = od.Product_Id
                            WHERE o.Customer_Id = @customerId";

            var orders = new Dictionary<int, Order>();

            var userOrders = db.Query<Order, Order_Details, Product, Order>(sql, (order, order_details, product) =>
            {
                //in the case that I haven't seen the order before, 
                //add it to the dictionary, and initialize the lists
                if (!orders.ContainsKey(order.Id))
                {
                    order.Order_Details = new List<Order_Details>();
                    order.Products = new List<Product>();
                    orders.Add(order.Id, order);
                }

                //add the product and order items to the correct lists
                var currentOrder = orders[order.Id];
                currentOrder.Order_Details.Add(order_details);
                currentOrder.Products.Add(product);
                
                //return the order item

                return currentOrder;
            }, new { customerId = customerId }, splitOn: "Id").Distinct();
            return userOrders;

        }

        public IEnumerable<Order> GetAllOrdersByCreator(int creatorId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"SELECT * from Orders o
                        JOIN Order_Details od 
                            ON od.Order_Id = o.id
                        JOIN Products p
                            ON p.id = od.Product_Id
                        WHERE p.Creator_Id = @creatorId";
            var orders = new Dictionary<int, Order>();
            var userOrders = db.Query<Order, Order_Details, Product, Order>(sql, (order, order_details, product) =>
            {
                //in the case that I haven't seen the order before, 
                //add it to the dictionary, and initialize the lists
                if (!orders.ContainsKey(order.Id))
                {
                    order.Order_Details = new List<Order_Details>();
                    order.Products = new List<Product>();
                    orders.Add(order.Id, order);
                }

                //add the product and order items to the correct lists
                var currentOrder = orders[order.Id];
                currentOrder.Order_Details.Add(order_details);
                currentOrder.Products.Add(product);

                //return the order item

                return currentOrder;
            }, new { creatorId = creatorId }, splitOn: "Id").Distinct();
            return userOrders;
        }

        public double GetTotalCreatorSales(int creatorId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"SELECT SUM(od.Unit_Price * od.Quantity) from Orders o
                        JOIN Order_Details od 
                            ON od.Order_Id = o.id
                        JOIN Products p
                            ON p.id = od.Product_Id
                        WHERE p.Creator_Id = @creatorId";
            return db.ExecuteScalar<double>(sql, new { creatorId = creatorId });
        }

        public double GetAverageProductSoldPrice(int creatorId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"SELECT AVG(od.Unit_Price) from Orders o
                        JOIN Order_Details od 
                            ON od.Order_Id = o.id
                        JOIN Products p
                            ON p.id = od.Product_Id
                        WHERE p.Creator_Id = @creatorId";
            return db.ExecuteScalar<double>(sql, new { creatorId = creatorId });
        }

        public double GetTotalCreatorSalesLastMonth(int creatorId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"SELECT SUM(od.Unit_Price * od.Quantity) from Orders o
                        JOIN Order_Details od 
                            ON od.Order_Id = o.id
                        JOIN Products p
                            ON p.id = od.Product_Id
                        WHERE p.Creator_Id = 7
                        AND DATEDIFF(day, o.Order_Date, GETDATE()) < 30;";
            return db.ExecuteScalar<double>(sql, new { creatorId = creatorId });
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

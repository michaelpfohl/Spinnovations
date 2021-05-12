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
    public class ProductRepository
    {
        readonly string ConnectionString;

        public ProductRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Spinnovations");
        }

        public List<Product> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Products WHERE Active = 1";
            return db.Query<Product>(sql).ToList();
        }

        public List<Product> GetProductsByCreatorId(int creatorId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Products WHERE Creator_Id = @creatorId AND Active = 1";
            return db.Query<Product>(sql, new { creatorId = creatorId }).ToList();
        }

        public Product Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Products WHERE Id = @id";
            var product = db.QueryFirstOrDefault<Product>(sql, new { id = id });
            return product;
        }

        public List<Product> GetLast20()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT TOP 20 *
                        FROM Products
                        WHERE Active = 1
                        ORDER BY Id DESC";
            return db.Query<Product>(sql).ToList();
        }

        public List<Product> GetProductsInCategory(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM Products AS p
                        JOIN Product_Category AS pc ON p.Category_Id = pc.Id
                        WHERE p.Category_Id = @id AND p.Active = 1";
            return db.Query<Product>(sql, new { id = id}).ToList();
        }

        public void Add(Product product)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"INSERT INTO [Products]
                               ([Name]
                               ,[ImageUrl]
                               ,[Description]
                               ,[Category_Id]
                               ,[Price]
                               ,[Creator_Id]
                               ,[Quantity_In_Stock]
                               ,[Active])
                         VALUES (@Name, @ImageUrl, @Description, @Category_Id, @Price, @Creator_Id, @Quantity_In_Stock, 1)";
            var id = db.ExecuteScalar<int>(sql, product);
            product.Id = id;
        }

        public void Update(Product product)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE Products
                        SET Name = @name,
                            ImageUrl = @imageUrl,
                            Description = @description,
                            Category_Id = @category_Id,
                            Price = @price,
                            Quantity_In_Stock = @quantity_In_Stock,
                            Active = 1
                        WHERE Id = @id";
            db.Execute(sql, product);
        }

        public void DeleteProduct(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE Products
                        SET Active = 0
                        WHERE Id = @id";
            db.Execute(sql, new { id = id });
        }

        public void DeleteProductsByCreator(int creatorId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE Products
                        SET Active = 0
                        WHERE Creator_Id = @creatorId";
            db.Execute(sql, new { creatorId = creatorId });
        }

    }
}

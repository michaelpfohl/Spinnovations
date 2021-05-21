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
    public class ProductCategoryRepository
    {
        readonly string ConnectionString;

        public ProductCategoryRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Spinnovations");
        }

        public IEnumerable<ProductCategory> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM [Product_Category]";
            return db.Query<ProductCategory>(sql).ToList();
        }

        public IEnumerable<ProductCategory> GetAllCategoriesWithProducts()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT DISTINCT pc.* FROM Product_Category AS pc
                        JOIN Products AS p ON p.Category_Id = pc.id";
            return db.Query<ProductCategory>(sql).ToList();
        }

        public ProductCategory Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM [Product_Category] WHERE Id = @id";
            var productCategory = db.QueryFirstOrDefault<ProductCategory>(sql, new { id = id });
            return productCategory;
        }

        public void Add(ProductCategory pc)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"INSERT INTO [Product_Category]
                           ([Category_Name])
                        VALUES
                           (@Category_Name)";
            var id = db.ExecuteScalar<int>(sql, pc);
            pc.Id = id;
        }

        public void Update(ProductCategory pc)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE Product_Category
                        SET Category_Name = @category_Name
                        WHERE Id = @id";
            db.Execute(sql, pc);
        }

        public void Delete(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "DELETE FROM Product_Category WHERE Id = @id";
            db.Execute(sql, new { id = id });
        }

        public IEnumerable<CategoryTotals> GetQuantityByCategory(int creatorId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT pc.Category_Name AS [Name], SUM(p.Quantity_In_Stock) AS [Total] FROM Products AS p
                        JOIN Product_Category AS pc ON pc.Id = p.Category_Id
                        WHERE p.Creator_Id = @creatorId
                        GROUP BY pc.Category_Name";
            return db.Query<CategoryTotals>(sql, new { creatorId = creatorId });
        }
    }
}

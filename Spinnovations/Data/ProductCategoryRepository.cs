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
    }
}

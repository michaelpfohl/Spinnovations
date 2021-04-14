using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Spinnovations.Models;

namespace Spinnovations.Data
{
    public class PaymentInfoRepository
    {
        const string ConnectionString = "placeholder";

        public List<Product> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM PaymentInfo";
            return db.Query<Product>(sql).ToList();
        }
    }
}

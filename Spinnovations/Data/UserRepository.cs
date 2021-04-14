using Spinnovations.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace Spinnovations.Data
{
    public class UserRepository
    {
        const string ConnectionString = "Server=localhost;Database=Spinnovations;Trusted_Connection=True;";

        //public List<User> GetAll()
        //{
            //using var db = new SqlConnection(ConnectionString);
            //var sql = @"SELECT *
            //            FROM Users";
            //return db.Query<User>(sql).ToList();
        //}
    }
}

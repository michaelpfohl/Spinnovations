using Spinnovations.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;

namespace Spinnovations.Data
{
    public class UserRepository
    {
        readonly string ConnectionString;

        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Spinnovations");
        }
        public List<User> GetAllUsers()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM Users";
            return db.Query<User>(sql).ToList();
        }

        public User GetUser(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM Users 
                        WHERE Id = @id";
            var user = db.QueryFirstOrDefault<User>(sql, new { id = id });
            return user;
        }

        public User GetUserByFirebaseUid(string firebase_Uid)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM Users 
                        WHERE Firebase_Uid = @firebase_Uid";
            var user = db.QueryFirstOrDefault<User>(sql, new { firebase_Uid = firebase_Uid });
            return user;
        }

        public void AddUser(User user)
        {
            using var db = new SqlConnection(ConnectionString);
            var user_created_date = DateTime.Now;
            user.User_Created_Date = user_created_date;
            var sql = @"INSERT INTO [Users]
	                        ([First_Name],
	                        [Last_Name],
	                        [Address],
	                        [City],
	                        [Country],
	                        [Postal_Code],
	                        [Display_Name],
	                        [Profile_Picture],
	                        [User_Created_Date],
	                        [State],
                            [Firebase_Uid])
                        VALUES 
	                        (@First_Name, 
	                        @Last_Name, 
	                        @Address, 
	                        @City, 
	                        @Country, 
	                        @Postal_Code, 
	                        @Display_Name,
	                        @Profile_Picture,
	                        @User_Created_Date,
	                        @State,
                            @Firebase_Uid)";
            var id = db.ExecuteScalar<int>(sql, user);
            user.Id = id;
        }

        public void UpdateUser(User user)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE [Users]
                        SET First_Name = @First_Name,
                            Last_Name = @Last_Name,
                            [Address] = @Address,
                            City = @City,
                            Country = @Country,
                            Postal_Code = @Postal_Code,
                            Display_Name = @Display_Name,
                            Profile_Picture = @Profile_Picture,
                            User_Created_Date = @User_Created_Date,
                            [State] = @State,
                            Firebase_Uid = @Firebase_Uid
                        WHERE Id = @id";
            db.Execute(sql, user);
        }
        public void DeleteUser(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"DELETE 
                        FROM Users 
                        WHERE Id = @id";
            db.Execute(sql, new { id = id });
        }

    }
}

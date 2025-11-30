using Dapper;
using ServiceApi.Model;
using ServiceApi.Model.DBModels;
using System.Data;

namespace ServiceApi.Helpers
{
    public class DatabaseHelpers : IDatabaseHelpers
    {
        private readonly IDbConnection _db;

        public DatabaseHelpers(IDbConnection db) 
        {
            _db = db;
        }

        public async Task<IEnumerable<EmployeeTable>> GetEmployeesAsync()
        {
            string sql = "SELECT * FROM EmployeeTable";
            return await _db.QueryAsync<EmployeeTable>(sql);
        }

        public async Task<EmployeeTable> GetEmployeeByIdandPasswordAsync(string userName, string password)
        {
            string sql = "SELECT * FROM EmployeeTable WHERE Emp_UserName = @UserName and Emp_Password = @Password";
            return await _db.QueryFirstOrDefaultAsync<EmployeeTable>(sql, new { UserName = userName , Password = password });
        }

        public async Task<int> AddEmployeeAsync(EmployeeRegisterRequest user)
        {
            string sql = "INSERT INTO EmployeeTable (Emp_UserName, Emp_EmailId, Emp_Password) VALUES (@Username, @Email, @Password)";
            return await _db.ExecuteAsync(sql, new { UserName = user.UserName, Email = user.EmailId , Password = user.Password });
        }

        public async Task<int> UpdateEmployeeAsync(EmployeeUpdateRequest user)
        {
            string sql = @"UPDATE EmployeeTable 
                       SET Emp_UserName = @UserName, Emp_EmailId = @Email 
                       WHERE Emp_Id = @Id";

            return await _db.ExecuteAsync(sql, new { UserName = user.Emp_UserName, Email = user.Emp_EmailId, Id = user.Emp_Id });
        }

        public async Task<int> DeleteEmployee(int id)
        {
            string sql = "DELETE FROM EmployeeTable WHERE Emp_Id = @Id";

            return await _db.ExecuteAsync(sql, new { Id = id });
        }
    }
}

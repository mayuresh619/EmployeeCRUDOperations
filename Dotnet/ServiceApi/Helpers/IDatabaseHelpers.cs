using ServiceApi.Model;
using ServiceApi.Model.DBModels;

namespace ServiceApi.Helpers
{
    public interface IDatabaseHelpers
    {
        Task<IEnumerable<EmployeeTable>> GetEmployeesAsync();

        Task<EmployeeTable> GetEmployeeByIdandPasswordAsync(string userName, string password);

        Task<int> AddEmployeeAsync(EmployeeRegisterRequest user);
    }
}

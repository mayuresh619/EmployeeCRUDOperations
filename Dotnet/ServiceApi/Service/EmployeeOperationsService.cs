using ServiceApi.Helpers;
using ServiceApi.Model;

namespace ServiceApi.Service
{
    public class EmployeeOperationsService : IEmployeeOperationsService
    {
        IDatabaseHelpers _databaseHelpers;

        public EmployeeOperationsService(IDatabaseHelpers databaseHelpers) 
        {
            _databaseHelpers = databaseHelpers;
        }

        public bool FetchEmployeeData(string username, string password)
        {
            var result = _databaseHelpers.GetEmployeeByIdandPasswordAsync(username, password).Result;
            if (result != null)
            {
                return true;
            }
            return false;
        }

        public bool RegisterEmployee(EmployeeRegisterRequest request)
        {
            var result = _databaseHelpers.AddEmployeeAsync(request).Result;
            if (result > 0)
            {
                return true;
            }
            return false;
        }
    }
}

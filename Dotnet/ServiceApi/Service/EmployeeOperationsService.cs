using ServiceApi.Helpers;
using ServiceApi.Model;
using ServiceApi.Model.DBModels;

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

        public IEnumerable<EmployeeTable> FetchEmployeeList()
        {
            var result = _databaseHelpers.GetEmployeesAsync().Result;
            return result;
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

        public bool UpdateEmployee(EmployeeUpdateRequest request)
        {
            var result = _databaseHelpers.UpdateEmployeeAsync(request).Result;
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public bool DeleteEmployee(int empId)
        {
            var result = _databaseHelpers.DeleteEmployee(empId).Result;
            if (result > 0)
            {
                return true;
            }
            return false;
        }
    }
}

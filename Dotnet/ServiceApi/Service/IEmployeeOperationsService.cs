using ServiceApi.Model;
using ServiceApi.Model.DBModels;

namespace ServiceApi.Service
{
    public interface IEmployeeOperationsService
    {
        bool FetchEmployeeData(string username, string password);

        bool RegisterEmployee(EmployeeRegisterRequest request);

        IEnumerable<EmployeeTable> FetchEmployeeList();

        bool UpdateEmployee(EmployeeUpdateRequest request);

        bool DeleteEmployee(int empId);
    }
}

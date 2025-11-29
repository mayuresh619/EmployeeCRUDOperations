using ServiceApi.Model;

namespace ServiceApi.Service
{
    public interface IEmployeeOperationsService
    {
        bool FetchEmployeeData(string username, string password);

        bool RegisterEmployee(EmployeeRegisterRequest request);
    }
}

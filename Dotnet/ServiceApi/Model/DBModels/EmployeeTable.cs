using System.Text.Json.Serialization;

namespace ServiceApi.Model.DBModels
{
    public class EmployeeTable
    {
        public int Emp_Id { get; set; }
        public string Emp_UserName { get; set; }

        public string Emp_EmailId { get; set; }

        [JsonIgnore]
        public string Emp_Password { get; set; }
    }
}

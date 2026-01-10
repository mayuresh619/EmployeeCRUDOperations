import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './models/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5221/api/Employee';

  constructor(private http: HttpClient) {}
  
  login(credentials: { username: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/GetEmp`;

    const params = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);
    return this.http.get(url, {params,responseType: 'text'});
  }

  getAllEmployees(): Observable<Employee[]>{
    const url = `${this.apiUrl}/GetEmpList`;
    return this.http.get<Employee[]>(url);
  }

  deleteEmployee(id:number): Observable<any>{
     const url = `${this.apiUrl}/DeleteEmployee?empId=${id}`;
    return this.http.delete(url);
  }

  updateEmployee(employee: any): Observable<any> {
  const employeeToUpdate = {
      Emp_Id: employee.emp_Id,
      Emp_UserName: employee.emp_UserName,
      Emp_EmailId: employee.emp_EmailId
    };
  const url = `${this.apiUrl}/UpdateEmployee`; 
  return this.http.patch(url, employeeToUpdate,{ 
    responseType: 'text' 
  });
}
}

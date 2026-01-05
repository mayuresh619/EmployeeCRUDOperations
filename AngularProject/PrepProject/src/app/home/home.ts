import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
      this.employees = data;
    },
    error: (err) => console.error('Error fetching employees', err)
    });
  }

  onDelete(id: number) {
    if(confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees(); // Refresh list after deletion
      });
    }
  }

  onEdit(employee: any) {
    console.log('Edit employee:', employee);
    // Logic to open a modal or navigate to edit page
  }
}

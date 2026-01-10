import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  employees: any[] = [];
  isModalOpen = false;
  selectedEmployee: any = null; // Holds the data for the modal

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
        this.loadEmployees(); 
      });
    }
  }

  onEdit(employee: any) {
    this.selectedEmployee = { ...employee }; 
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEmployee = null;
  }

  updateEmployee() {
    if (this.selectedEmployee) {
      this.employeeService.updateEmployee(this.selectedEmployee).subscribe({
        next:(data)=>{
        this.loadEmployees(); 
        this.closeModal();   
        },
        error:(err) =>{
          console.log("Error fetching data");
        }
      });
    }
  }
}

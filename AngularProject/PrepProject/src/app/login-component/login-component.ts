import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {EmployeeService} from '../employee-service'
import { MatDialog } from '@angular/material/dialog';
import { SignUp } from '../sign-up/sign-up';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login-component',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private dialog: MatDialog,private router: Router ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.employeeService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Error: Invalid credentials or server down
        console.error('Login failed', error);
        alert('Invalid email or password. Please try again.');
      }
    });
    }
  }

  openSignUp(): void {
    this.dialog.open(SignUp, {
      width: '400px',
      // Optional: Pass data or disable closing on backdrop click
    });
  }

}

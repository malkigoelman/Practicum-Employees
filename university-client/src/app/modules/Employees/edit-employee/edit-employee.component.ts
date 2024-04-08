import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: Employee;
  employeeForm: FormGroup;

  constructor(private employeesService: EmployeesService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeesService.getWorkerByid(id)
      .subscribe(
        (data) => {
          if (data.roles === null) {
            data.roles = [];
          }
          this.employee = data;
          this.createForm();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  get roles(): FormArray {
    return this.employeeForm.get('Roles') as FormArray;
  }
  createForm(): void {
    this.employeeForm = this.fb.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      tz: [this.employee.tz, Validators.required],
      gender: [this.employee.gender, Validators.required],
      email: [this.employee.email, [Validators.required, Validators.email]],
      startDate: [this.employee.startDate, Validators.required],
      birthDay: [this.employee.birthDay, Validators.required],
      isActive: [this.employee.isActive],
      roles: this.fb.array(this.employee.roles.map(role => this.fb.group({
        name: [role.name],
        isAdmin: [role.isAdmin],
        startDate: [role.startDate]
      })))
    });
  }

  onSubmit(): void {
    const editedEmployee = this.employeeForm.value;
    console.log(editedEmployee);
    editedEmployee.firstName="nnnnn";
    // editedEmployee.gender === 'Male' ? 0 : 1;
    editedEmployee.gender =0;
    this.employeesService.editWorker(editedEmployee)
      .subscribe(
        (data) => {
          console.log('Employee updated successfully:', data);
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
  }

  addRole(): void {
    this.roles.push(this.fb.group({
      roleTypeId: ['', Validators.required],
      startDate: ['', Validators.required],
      management: [false]
    }));
  }
  
  removeRole(index: number): void {
    this.roles.removeAt(index);
  }

}

import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  
  newWorker: Employee = new Employee();
  userForm: FormGroup;
  isactive: boolean = true;

  constructor(private employeesService: EmployeesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tz: ['', Validators.required],
      birthDay: ['', Validators.required],
      startDate: ['', Validators.required],
      Gender: ['male', Validators.required],
      Roles: this.fb.array([])
    });
  }

  addRole(): void {
    const roleGroup = this.fb.group({
      roleName: ['', Validators.required],
      isAdmin: [false, Validators.required],
      startDate: ['', Validators.required]
    });
    (this.userForm.get('Roles') as FormArray).push(roleGroup);
  }

  removeRole(index: number): void {
    (this.userForm.get('Roles') as FormArray).removeAt(index);
  }

  onSubmit(): void {
    // Create an object in the format expected by the server
    const workerData = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      tz: this.userForm.value.tz,
      birthDay: this.userForm.value.birthDay,
      startDate: this.userForm.value.startDate,
      gender: this.userForm.value.Gender,
      // email: this.userForm.value.email,
      email:"ghjk@gmail.com" ,
      roles: this.userForm.value.Roles,
      isActive:true,
      id:0
    };
  
    this.employeesService.addWorker(workerData)
      .subscribe(
        (response) => {
          console.log('Worker added successfully:', response);
        }
        // ,
        // (error) => {
        //   console.error('Failed to add worker:', error);
        // }
      );
  }
  
}

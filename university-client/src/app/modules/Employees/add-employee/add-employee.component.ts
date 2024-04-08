import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EmployeesService } from '../employee.service';
import { Employee, Role } from '../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  userForm: FormGroup;
  rolesType: Role[] = []; // רשימת סוגי התפקידים שתוחזר מהשרת
  roles: FormArray; // מערך התפקידים בטופס

  constructor(private employeesService: EmployeesService, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tz: ['', Validators.required],
      birthDay: ['', Validators.required],
      startDate: ['', Validators.required],
      gender: ['male', Validators.required],
      email:['',Validators.required],
      Roles: this.fb.array([])
    });
  
    // קריאה לפונקציה שמחזירה את רשימת סוגי התפקידים מהשרת ושמירה במשתנה rolesType
    this.employeesService.getRolesType().subscribe(
      (data: Role[]) => {
        this.rolesType = data;
      },
      (error) => {
        console.error('Failed to fetch roles types:', error);
      }
    );
  
    // הגדרת roles כמערך FormArray
    this.roles = this.userForm.get('Roles') as FormArray;
  }

  addRole(): void {
    const roleGroup = this.fb.group({
      roleTypeId: [-1, Validators.required],
      startDate: ['', Validators.required],
      menagment: [false] // ניהול ברירת מחדל - לא
    });
    this.roles.push(roleGroup);
  }

  removeRole(index: number): void {
    this.roles.removeAt(index);
  }

  onSubmit(): void {
    const formData = this.userForm.value;

    const newEmployee: Employee = {
      id: 0,
      firstName: formData.firstName,
      lastName: formData.lastName,
      tz: formData.tz,
      birthDay: formData.birthDay,
      startDate: formData.startDate,
      gender: formData.gender === 'Male' ? 0 : 1,
      isActive: true,
      email: formData.email,
      roles: formData.Roles
    };

    this.employeesService.addWorker(newEmployee).subscribe(
      (response) => {
        console.log('Worker added successfully:', response);
      },
      (error) => {
        console.error('Failed to add worker:', error);
      }
    );
    this.router.navigate(['/employees']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EmployeesService } from '../employee.service';
import { Employee, Role, Gender } from '../models/employee.model';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';
import { EmployeesComponent } from '../employees/employees.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  userForm: FormGroup;
  rolesType: Role[] = [];
  roles: FormArray;

  constructor(private employeesService: EmployeesService,private fb: FormBuilder,private router: Router,private roleService: RoleService){ }
  
  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tz: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      birthDay: ['', Validators.required],
      startDate: ['', Validators.required],
      gender: ['Male', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Roles: this.fb.array([])
    }, { validator: this.dateOfBirthBeforeStartDate });
  
    this.roleService.getRolesType().subscribe(
      (data: Role[]) => {
        this.rolesType = data;
      },
      (error) => {
        console.error('Failed to fetch roles types:', error);
      }
    );
  
    this.roles = this.userForm.get('Roles') as FormArray;
  }

  addRole(): void {
    const roleGroup = this.fb.group({
      roleTypeId: [-1, Validators.required],
      startDate: ['', Validators.required],
      isAdmin: [false, Validators.required]
    });
    this.roles.push(roleGroup);
  }

  dateOfBirthBeforeStartDate(group: FormGroup): {[s: string]: boolean} {
    const birthDay = group.controls['birthDay'].value;
    const startDate = group.controls['startDate'].value;
    if (birthDay && startDate && birthDay > startDate) {
      return {'invalidDates': true};
    }
    return null;
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
      gender: formData.gender === 'Male' ? Gender.Male : Gender.Female,
      isActive: true,
      email: formData.email,
      roles: formData.Roles
    };

    this.employeesService.addWorker(newEmployee).subscribe(
      (response) => {
        console.log('Worker added successfully:', response);
          this.router.navigate(['/employees']);
      },
      (error) => {
        console.error('Failed to add worker:', error);
      }
    );

    formData.Roles.forEach((role: Role) => {
      this.roleService.saveRole(role).subscribe(
        (response) => {
          console.log('Role added successfully:', response);
        },
        (error) => {
          console.error('Failed to add role:', error);
        }
      );
    });
  }    
}

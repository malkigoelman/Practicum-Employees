import { Component, OnInit } from '@angular/core';
import { Employee, Role } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../role/role.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  newWorker: Employee = new Employee(); // יצירת מופע חדש של עובד
  userForm: FormGroup;
  isActive: boolean = true;
  roles: Role[] = [];

  constructor(private employeesService: EmployeesService, private fb: FormBuilder,private roleService:RoleService) {
    this.roleForm=this.fb.group({
      roleName:['',Validators.required],
      isAdmin:[false,Validators.required],
      startDate: ['', Validators.required]
    });
    this.loadRoles();
   }

  ngOnInit(): void {
    // הגדרת הטופס עם FormBuilder
    this.userForm = this.fb.group({
      f_name: ['', Validators.required], // שם פרטי חובה
      l_name: ['', Validators.required], // שם משפחה חובה
      tz: ['', Validators.required], // תעודת זהות חובה
      birthDay: ['', Validators.required], // תאריך לידה חובה
      startDate: ['', Validators.required], // תאריך התחלה חובה
      gender: ['male', Validators.required], // מגדר חובה
    });
  }
  saveEmployee(): void {
    this.newWorker.active = this.isActive;
  }
  addRole(): void {
    this.newWorker.roles.push({ name: '', isAdmin: false, startDate: null });
  }
  removeRole(index: number): void {
    this.newWorker.roles.splice(index, 1);
  }
  saveRole() {
    if (this.roleForm.valid) {
      const roleName = this.roleForm.value.roleName;
      if (this.roles.some(role => role.name === roleName)) {
        alert('Role already exists');
      } else {
        this.roleService.saveRole(this.roleForm.value).subscribe(
          (data: any) => {
            alert('Role added successfully');
            this.roleForm.reset();
            this.loadRoles();
          },
          (error: any) => {
            console.error('Error saving role:', error);
          }
        );
      }
    }
  }
  isStartDateValid() {
    const startDate = new Date(this.roleForm.value.startDate);
    const currentDate = new Date();
    return startDate <= currentDate;
  }
  roleForm: FormGroup;

  loadRoles() {
    this.roleService.getAllRoles().subscribe(
      // (data: Role[]) => {
      //   this.roles = data;
      // },
      (error: any) => {
        console.error('Error loading roles:', error);
      }
    );
  }
  onSubmit(): void {
    this.newWorker.active = this.isActive;
    console.log(this.newWorker);
    this.employeesService.addWorker(this.newWorker)
      .subscribe(
        (response) => {
          console.log('Worker added successfully:', response);
        },
        (error) => {
          console.error('Failed to add worker:', error);
        }
      );
  }
}

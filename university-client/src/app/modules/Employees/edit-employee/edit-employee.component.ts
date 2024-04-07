// import { Component, OnInit } from '@angular/core';
// import { Employee } from '../models/employee.model';
// import { EmployeesService } from '../employee.service';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-edit-employee',
//   templateUrl: './edit-employee.component.html',
//   styleUrls: ['./edit-employee.component.css']
// })
// export class EditEmployeeComponent implements OnInit {

//   employee: Employee;

//   constructor(private employeesService: EmployeesService, private route: ActivatedRoute, private router: Router) { }

//   ngOnInit(): void {
//     const id = +this.route.snapshot.paramMap.get('id');
//     this.employeesService.getWorkerByid(id)
//       .subscribe(
//         (data) => {
//           if (data.roles === null) {
//             data.roles = []; // אם התפקידים מתקבלים כ- null, אז נאתחל אותם כמערך ריק
//           }
//           this.employee = data;
//         },
//         (error) => {
//           console.error(error);
//         }
//       );
//   }
  

//   saveChanges(): void {
//     this.employeesService.editWorker(this.employee)
//       .subscribe(
//         (data) => {
//           console.log('Employee updated successfully:', data);
//           this.router.navigate(['/employees']);
//         },
//         (error) => {
//           console.error('Error updating employee:', error);
//         }
//       );
//   }

//   addRole(): void {
//     this.employee.roles.push({ name: '', isAdmin: false, startDate: null });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: Employee; // הוספת הגדרה של המשתנה employee
  
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

  saveChanges(): void {
    // if (this.employeeForm.valid) {
      const editedEmployee = this.employeeForm.value;
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
    // } else {
      // console.log('Form is invalid');
    // }
  }

  addRole(): void {
    this.employee.roles.push({ name: '', isAdmin: false, startDate: null });
    this.createForm();
  }
}

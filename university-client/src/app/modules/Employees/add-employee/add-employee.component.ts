import { Component } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  newWorker: Employee = new Employee(); // יצירת מופע חדש של עובד

  constructor(private employeesService: EmployeesService) { }

  isActive: boolean = true;
  saveEmployee(): void {
      this.newWorker.active = this.isActive;
      this.newWorker.birthDay=new Date();
  }
  addRole(): void {
    this.newWorker.roles.push({ name: '', isAdmin: false, startDate: null });
  }

  removeRole(index: number): void {
    this.newWorker.roles.splice(index, 1);
  }
  onSubmit(): void {
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
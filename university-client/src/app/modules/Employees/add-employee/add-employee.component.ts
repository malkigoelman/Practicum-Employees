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

  onSubmit(): void {
    this.employeesService.addWorker(this.newWorker)
      .subscribe(
        (response) => {
          console.log('Worker added successfully:', response);
          // כאן תוסיף פעולות נוספות לאחר הוספת העובד
        },
        (error) => {
          console.error('Failed to add worker:', error);
          // טיפול בשגיאה במידה וההוספה נכשלה
        }
      );
  }
}
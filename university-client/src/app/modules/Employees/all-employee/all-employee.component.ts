import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css'] // השתמשתי בסגנון של styleUrls
})
export class AllEmployeeComponent implements OnInit {

  constructor(private employeesService: EmployeesService) { }

  employees: Employee[];

  ngOnInit(): void {
    this.getAllWorkers();
  }

  getAllWorkers(): void {
    this.employeesService.getAllWorkers()
      .subscribe(
        (data) => {
          console.log(data); // בדיקת נתוני התגובה מהשרת
          this.employees = data;
        },
        (error) => {
          console.log('Error:', error); // טיפול בשגיאה
        }
      );
  }
  
}

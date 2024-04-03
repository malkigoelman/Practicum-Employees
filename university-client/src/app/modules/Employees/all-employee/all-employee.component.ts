import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-all-employee',
  standalone: true,
  imports: [],
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.css'
})
export class AllEmployeeComponent implements OnInit {

  constructor(private employeesService: EmployeesService) { }

  employees:Employee[];

  ngOnInit(): void {
    this.getAllWorkers();
  }
  getAllWorkers(): void {
    this.employeesService.getAllWorkers()
      .subscribe(
        (data) => {
          this.employees = data;
        },
        (error) => {
          console.log(error); // טיפול בשגיאות
        }
      );
  }
}

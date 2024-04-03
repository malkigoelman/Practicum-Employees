import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  newWorker: Employee = new Employee(); // Creating a new instance of Employee

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const employeeId = +this.route.snapshot.paramMap.get('id');
    // this.employeesService.getEmployeeById(employeeId)
    //   .subscribe((employee: Employee) => {
    //     this.newWorker = employee;
    //   });
  }

  submitForm(): void {
    this.employeesService.editWorker(this.newWorker)
      .subscribe((updatedEmployee: Employee) => {
        console.log('Employee updated successfully:', updatedEmployee);
      });
  }

}
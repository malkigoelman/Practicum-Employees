import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: Employee;

  constructor(private employeesService: EmployeesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeesService.getWorkerById(id)
      .subscribe(
        (data) => {
          this.employee = data;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  saveChanges(): void {
    this.employeesService.editWorker(this.employee)
      .subscribe(
        (data) => {
          console.log('Employee updated successfully:', data);
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
  }

  addRole(): void {
    this.employee.roles.push({ name: '', isAdmin: false, startDate: null });
  }
}

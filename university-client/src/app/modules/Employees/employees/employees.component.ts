import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  workers: Employee[]; // מערך לאחסון העובדים

  constructor(private employeesService: EmployeesService,private router: Router) { }
  ngOnInit(): void {
    this.getWorkers();
  }
  deactivateWorker(id: Number): void {
    this.employeesService.deactivateWorker(id)
      .subscribe(
        (updatedWorker) => {
          console.log('Worker deactivated successfully:', updatedWorker);
          this.workers = this.workers.filter(w => w !== updatedWorker);
        },
        (error) => {
          console.error('Failed to deactivate worker:', error);
        }
      );
  }
  getWorkers(): void {
    this.employeesService.getWorkers()
      .subscribe(
        (data) => {
          this.workers = data;
        },
        (error) => {
          console.log(error); // טיפול בשגיאות
        }
      );
  }
  editWorker(worker: Employee): void {
    console.log('Editing worker:', worker);
  }
  deleteWorker(worker: Employee): void {
    console.log('Deleting worker:', worker);
  }
}
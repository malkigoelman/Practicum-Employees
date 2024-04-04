import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  workers: Employee[]; // מערך לאחסון העובדים

  constructor(private employeesService: EmployeesService, private router: Router) { }
  ngOnInit(): void {
    this.getWorkers();
  }
  removeWorker(worker: Employee): void {
    const id = worker.id;
    console.log(id);
    this.employeesService.removeWorker(id)
          // this.workers = this.workers.filter(w => w !== worker);
      ;
      console.log(worker.active);
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
  addWorker(): void {
    console.log('add worker');
    this.router.navigate(['/add']);
  }
  editWorker(worker: Employee): void {
    console.log('Editing worker:', worker);
    this.router.navigate(['/', worker.tz]); // מנותב לדף העריכה ומעביר את מספר הזיהוי של העובד כפרמטר
  }
  exportXSLX() {
    var name = 'Employees.xlsx';
    let element = document.getElementById('workers');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'גליון1');
    XLSX.writeFile(wb,name);

  }
}
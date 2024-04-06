import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  workers: Employee[]; // מערך לאחסון העובדים

  constructor(private employeesService: EmployeesService, private router: Router) { }
  @ViewChild('table') table: ElementRef;
  ngOnInit(): void {
    this.getWorkers();
  }
  removeWorker(worker: Employee): void {
    const id = worker.id;
    console.log(id);
    this.employeesService.deleteWorker(id)
      .subscribe(
        () => {
          // this.workers = this.workers.filter(w => w !== worker);
          console.log('Worker deleted successfully.');
        },
        (error) => {
          console.error('Error deleting worker:', error);
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
  addWorker(): void {
    console.log('add worker');
    this.router.navigate(['/add']);
  }
  editWorker(worker: Employee): void {
    console.log('Editing worker:', worker);
    this.router.navigate(['/edit', worker.id]); // מנותב לדף העריכה ומעביר את מספר הזיהוי של העובד כפרמטר
  }

  exportXSLX() {
    const name = 'Employees.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, name);
  }
  exportXSLXToMail() {
    const name = 'Employees.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const data: Blob = new Blob([this.sheetToArrayBuffer(wb)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(data);
    window.open(`mailto:?subject=קובץ%20עובדים&body=צרופה%20נמצאת%20בקובץ%20בפורמט%20XLSX.%0D%0A%0D%0Aאנא%20המשך%20לשליחת%20המייל%20עם%20הקובץ%20המצורף%20לך.%0D%0A%0D%0Aבברכה%2C%0D%0Aהצוות%20שלנו`, '_blank');
    window.location.href = url;
  }

  sheetToArrayBuffer(workbook: XLSX.WorkBook): ArrayBuffer {
    const wbout: ArrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return wbout;
  }
}

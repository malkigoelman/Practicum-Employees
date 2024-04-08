import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  @ViewChild('content') content: AddEmployeeComponent;

  workers: Employee[]; // מערך לאחסון העובדים

  constructor(private employeesService: EmployeesService, private router: Router) { }
  @ViewChild('table') table: ElementRef;
  ngOnInit(): void {
    this.searchEmployees();
  }
  searchText: string = '';
  searchResults: Employee[] = [];
  onSearchInput(): void {
    if (this.searchText.trim() !== '') {
      this.searchEmployees();
    }
  }
  
  searchAction(): void {
    if (this.searchText.trim() === '') {
      this.searchEmployees();
    } else {
      this.searchClean();
    }
  }
  
  searchClean(): void {
    this.searchText = ''; // השמה של ערך ריק לשדה החיפוש
    this.searchEmployees(); // קריאה מחדש לפונקצית החיפוש כדי לרענן את רשימת העובדים
  }
  
  searchEmployees(): void {
    if (this.searchText.trim() === '') {
      this.getWorkers(); // אם החיפוש ריק, נביא את כל העובדים
    } else {
      // אם החיפוש אינו ריק, נבצע את פעולת החיפוש ונציג את התוצאות
      this.employeesService.searchEmployees(this.searchText)
        .subscribe(
          (results) => {
            this.workers = results;
          },
          (error) => {
            console.error('Error searching employees:', error);
          }
        );
    }
  }
  
  removeWorker(worker: Employee): void {
    const id = worker.id;
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion
        this.employeesService.deleteWorker(id)
          .subscribe(
            () => {
              this.workers = this.workers.filter(w => w !== worker); // מחיקת העובד מהרשימה
              console.log('Worker deleted successfully.');
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success'); // הצגת הודעת אישור
            },
            (error) => {
              console.error('Error deleting worker:', error);
              Swal.fire('Error', 'There was an error deleting the worker.', 'error'); // הצגת הודעת שגיאה
            }
          );
      }
    });
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
  sendEmailToEmployee(employee: Employee): void {
    const subject = encodeURIComponent('רשימת התפקידים שלך');
    let body = 'רשימת התפקידים שלך:\n\n';
    // employee.roles.forEach((role, index) => {
    //   body += `${index + 1}. ${role.name}\n`;
    // });
    const mailtoLink = `mailto:${employee.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  }


  sheetToArrayBuffer(workbook: XLSX.WorkBook): ArrayBuffer {
    const wbout: ArrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return wbout;
  }
}

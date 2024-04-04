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

  employee: Employee; // עובד שיערוך

  constructor(private employeesService: EmployeesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // קבלת מספר הזיהוי של העובד מה-URL
    const id = +this.route.snapshot.paramMap.get('id');
    // קריאה לשירות כדי לקבל את פרטי העובד לעריכה
    this.employeesService.getWorkerById(id)
      .subscribe(
        (data) => {
          this.employee = data;
        },
        (error) => {
          console.log(error); // טיפול בשגיאות
        }
      );
  }

  saveChanges(): void {
    // בצע כאן שמירת השינויים לעובד
    this.employeesService.editWorker(this.employee)
      .subscribe(
        (data) => {
          console.log('Employee updated successfully:', data);
          // ניתוב חזרה לדף הרשימת עובדים לאחר שמירת השינויים
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.log('Error updating employee:', error); // טיפול בשגיאות
        }
      );
  }
  addRole(): void {
    this.employee.roles.push({ name: '', isAdmin: false, startDate: null });
  }
}
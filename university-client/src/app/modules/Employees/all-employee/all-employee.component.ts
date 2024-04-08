import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employee.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css']
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
          console.log(data);
          this.employees = data;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
  }

  changeStatus(worker: Employee): void {
    const id = worker.id;
    console.log(id);
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "אתה משנה כעת את סטטוס העובד!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        if (worker.isActive) {
          this.employeesService.deleteWorker(id)
            .subscribe(
              () => {
                console.log('Worker deleted successfully.');
                Swal.fire('לא פעיל!', 'עובד זה אינו פעיל', 'success');
              },
              (error) => {
                console.error('שגיאה במחיקת עובד:', error);
                Swal.fire('שגיאה', 'הייתה שגיאה במחיקת העובד.', 'error');
              }
            );
        } else {
          // Assuming you have an updateWorker method in your service
          this.employeesService.updateStatus(id)
            .subscribe(
              () => {
                console.log('Worker updated successfully.');
                Swal.fire('עודכן!', 'העובד עודכן בהצלחה.', 'success');
              },
              (error) => {
                console.error('שגיאה בעדכון עובד:', error);
                Swal.fire('שגיאה', 'הייתה שגיאה בעדכון העובד.', 'error');
              }
            );
        }
      }
    });
  }
  
}

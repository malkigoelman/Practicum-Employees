import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from '../modules/Employees/employees/employees.component';
import { AddEmployeeComponent } from '../modules/Employees/add-employee/add-employee.component';

const routes: Routes = [
    { path: 'employees', component: EmployeesComponent },
    { path: 'add-worker', component: AddEmployeeComponent },
    // ניתן להוסיף נתיבים נוספים כאן לדפים נוספים באפליקציה
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
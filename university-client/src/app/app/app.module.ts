import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routes";
import { EmployeesModule } from "../modules/Employees/employees.module";
import { AddEmployeeComponent } from "../modules/Employees/add-employee/add-employee.component";
import { HttpClientModule } from "@angular/common/http";
import { EditEmployeeComponent } from "../modules/Employees/edit-employee/edit-employee.component";
import { AllEmployeeComponent } from "../modules/Employees/all-employee/all-employee.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        EmployeesModule, // מייבאים את EmployeesModule ולא את הקומפוננטה בודדת
        AppRoutingModule
    ],
    declarations: [AppComponent,AddEmployeeComponent,EditEmployeeComponent],
    providers: [],
    bootstrap: [AppComponent],
    exports: [RouterModule, AppComponent]
})
export class AppModule {}
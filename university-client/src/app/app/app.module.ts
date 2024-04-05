import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app.routes";
import { EmployeesModule } from "../modules/Employees/employees.module";
import { AppComponent } from "./app.component";
import { AddEmployeeComponent } from "../modules/Employees/add-employee/add-employee.component";
import { EditEmployeeComponent } from "../modules/Employees/edit-employee/edit-employee.component";
import { ToolsComponent } from "../modules/tools/tools.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        EmployeesModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, AddEmployeeComponent, EditEmployeeComponent, ToolsComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}

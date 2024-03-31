import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EmployeesComponent } from "./employees/employees.component";
import { EmployeesService } from "./employee.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: EmployeesComponent }])
    ],
    declarations: [EmployeesComponent],
    providers: [EmployeesService] // ייבוא של שירות העובדים
})
export class EmployeesModule {}
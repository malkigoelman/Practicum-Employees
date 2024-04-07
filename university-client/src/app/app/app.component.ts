import { Component } from '@angular/core';
import { Employee } from '../modules/Employees/models/employee.model';
import { EmployeesService } from '../modules/Employees/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss']
})
export class AppComponent {
  isHovering: boolean = false;

  showSettings() {
    console.log("1");
    this.isHovering = true;
  }

  hideSettings() {
    console.log("2");
    this.isHovering = false;
  }
  
  searchText: string = '';
  searchResults: Employee[] = [];

  constructor(private employeesService: EmployeesService) {}

  searchEmployees(): void {
    if (this.searchText.trim() !== '') {
      this.employeesService.searchEmployees(this.searchText)
        // .subscribe(
        //   (results) => {
        //     this.searchResults = results;
        //   },
        //   (error) => {
        //     console.error('Error searching employees:', error);
        //   }
        // );
    }
  }
}

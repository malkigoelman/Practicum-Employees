import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee, Gender, Role } from "./models/employee.model";
import { log } from "node:console";

@Injectable()
export class EmployeesService {

  private readonly _baseUrl = 'https://localhost:7027/api/Workers'; // בסיס URL לקריאת נתוני העובדים

  constructor(private _http: HttpClient) { }

  getWorkers(): Observable<Employee[]> {
    return this._http.get<Employee[]>(this._baseUrl); // שליפת  העובדים מהשרת
  }
  getAllWorkers(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`https://localhost:7027/all`); // שליפת כל העובדים מהשרת
  }

  addWorker(employee: Employee): Observable<Employee> {
    console.log(employee);
    const dd = new Date(employee.birthDay);
    const dd2 = new Date(employee.startDate);
    employee.birthDay = dd;
    employee.startDate = dd2;
    return this._http.post<Employee>(this._baseUrl, employee);
  }
  deleteWorker(id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${id}`);
  }
  editWorker(employee: Employee): Observable<Employee> {
    const url = `${this._baseUrl}/${employee.id}`;
    console.log(employee);
    const dd = new Date(employee.birthDay);
    const dd2 = new Date(employee.startDate);
    employee.birthDay = dd;
    employee.startDate = dd2;
    console.log(employee.birthDay);
    return this._http.put<Employee>(`https://localhost:7027/api/Workers/1`,employee);  
  }
  getWorkerByid(id: number): Observable<Employee> {
    const url = `${this._baseUrl}/${id}`;
    return this._http.get<Employee>(url);
  }
  getRolesType(): Observable<Role[]> {
    return this._http.get<Role[]>('https://localhost:7027/api/Role/GetRoleNames');
  }
  searchEmployees(s:string){

  }

}
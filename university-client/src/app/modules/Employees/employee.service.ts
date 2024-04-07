import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee, Gender } from "./models/employee.model";
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
  addWorker(worker: Employee): Observable<Employee> {
    console.log(worker);
    return this._http.post<Employee>(this._baseUrl, worker); // הוספת עובד לשרת
  }
  deleteWorker(id: number): Observable<void> {
    return this._http.delete<void>(`https://localhost:7027/api/Workers/${id}`);
  }

  editWorker(employee: Employee): Observable<Employee> {
    const url = `${this._baseUrl}/${employee.id}`;
    // const url = `${this._baseUrl}/1`;
    console.log(employee);
    const dd = new Date(employee.birthDay);
    const dd2 = new Date(employee.startDate);
    // const e = {
      // Id: 1, FirstName: "string", LastName: "string", Tz: "string", BirthDay: new Date(), StartDate: new Date, Gender: Gender.Male, IsActive: true, Email: "string", Roles: [{ name: "aa", startDate: new Date, isAdmin: false }]
    // }
    employee.birthDay = dd;
    employee.startDate = dd2;
    console.log(employee.birthDay);

    // return this._http.put<Employee>(url, e);
    // return this._http.put<Employee>(`https://localhost:7027/api/Workers/${employee.id}`,employee);  
    return this._http.put<Employee>(`https://localhost:7027/api/Workers/1`,employee);  
  }
  getWorkerByid(id: number): Observable<Employee> {
    const url = `${this._baseUrl}/${id}`;
    return this._http.get<Employee>(url);
  }
}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "./models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
    
    private readonly _baseUrl = "api/Workers"; // בסיס URL לקריאת נתוני העובדים

    constructor(private _http: HttpClient) { }

    getWorkers(): Observable<Employee[]> {
       return this._http.get<Employee[]>(this._baseUrl); // שליפת  העובדים מהשרת
    }
    getAllWorkers(): Observable<Employee[]> {
      const url = `${this._baseUrl}/all`;
      return this._http.get<Employee[]>(url); // שליפת כל העובדים מהשרת
   }
    addWorker(worker: Employee): Observable<Employee> {
      return this._http.post<Employee>(this._baseUrl, worker); // הוספת עובד לשרת
    }
    deactivateWorker(id: Number): Observable<Employee> {
      const url = `${this._baseUrl}/${id}`;
      return this._http.put<Employee>(url, null);
    }
}
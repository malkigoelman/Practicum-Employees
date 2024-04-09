import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:7072'; // בסיס ה-URL לשרת התפקידים

  constructor(private _http: HttpClient) { }

  getAllRoles(): Observable<Role[]> {
    return this._http.get<Role[]>(`${this.baseUrl}/roles`);
  }

  getRolesType(): Observable<Role[]> {
    return this._http.get<Role[]>('https://localhost:7027/api/Role/GetRoleNames');
  }

  // שמירת תפקיד בשרת
  saveRole(role: Role): Observable<any> {
    const dd2 = new Date(role.startDate);
    role.startDate=dd2
    role.name=1;
    role.isAdmin=true;
    return this._http.post(`${this.baseUrl}/api/Role/AddRole`, role);
  }
}

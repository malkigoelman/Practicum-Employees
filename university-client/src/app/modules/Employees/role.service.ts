import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

  saveRole(role: Role): Observable<any> {
    const dd2 = new Date(role.startDate);
    role.startDate = dd2;
    return this.getRolesType().pipe(
      map((roles: Role[]) => {
        const index = roles.findIndex(type => type.name === role.name);
        if (index !== -1) {
          role.name = index; // הגדרת name לאינדקס שנמצא
        } else {
          console.error('Role not found in rolesType array');
        }
        return this._http.post(`${this.baseUrl}/api/Role/AddRole`, role);
      })
    );
  }
}
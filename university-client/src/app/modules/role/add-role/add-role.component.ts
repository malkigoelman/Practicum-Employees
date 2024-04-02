import { Component } from '@angular/core';
import { Role } from '../role.model';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  newRole: Role = {
    roleName: '',
    management: false,
    startDate: null
  };

  roles: string[] = ['תפקיד 1', 'תפקיד 2', 'תפקיד 3'];//צריך לשלוף מהשרת
  onSubmit() {
    // פונקציה זו תטופל כאשר הטופס מוגש
    // בצע כאן את הלוגיקה הנדרשת לבדיקת התאריך ושאר הלוגיקה שלך
  }
}
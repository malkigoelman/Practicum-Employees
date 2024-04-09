// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { RoleService } from '../role.service';
// import { Role } from '../role.model';

// @Component({
//   selector: 'app-role-form',
//   templateUrl: './add-role.component.html',
//   styleUrls: ['./add-role.component.css']
// })
// export class RoleFormComponent implements OnInit {
//   roleForm: FormGroup;
//   roles: Role[] = [];

//   constructor(
//     private formBuilder: FormBuilder,
//     private roleService: RoleService
//   ) {
//     this.roleForm = this.formBuilder.group({
//       roleName: ['', Validators.required],
//       isAdmin: [false, Validators.required],
//       startDate: ['', Validators.required]
//     });
//     this.loadRoles();
//   }

//   ngOnInit(): void {}

//   loadRoles() {
//     this.roleService.getAllRoles().subscribe(
//       (data: Role[]) => {
//         this.roles = data;
//       },
//       (error: any) => {
//         console.error('Error loading roles:', error);
//       }
//     );
//   }

//   saveRole() {
//     if (this.roleForm.valid) {
//       const roleName = this.roleForm.value.roleName;
//       if (this.roles.some(role => role.roleName === roleName)) {
//         alert('Role already exists');
//       } else {
//         this.roleService.saveRole(this.roleForm.value).subscribe(
//           (data: any) => {
//             alert('Role added successfully');
//             this.roleForm.reset();
//             this.loadRoles();
//           },
//           (error: any) => {
//             console.error('Error saving role:', error);
//           }
//         );
//       }
//     }
//   }

//   isStartDateValid() {
//     const startDate = new Date(this.roleForm.value.startDate);
//     const currentDate = new Date();
//     return startDate <= currentDate;
//   }
// }

export class Employee{
    public id:number;
    public firstName:string;
    public lastName:string;
    public tz:string;
    public birthDay:Date;
    public startDate:Date;
    public gender:Gender;
    public active:boolean;
    public email:string;
    public roles: Role[]; // מערך של תפקידים

    constructor() {
        this.roles = []; // אתחול של המערך בבנאי
    }
}
export enum Gender{
    Male,Female
}
export class Role {
    public name: string;
    public isAdmin: boolean;
    public startDate:Date;
}
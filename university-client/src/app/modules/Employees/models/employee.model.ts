export class Employee{
    public id:number=0;
    public f_name:string;
    public l_name:string;
    public tz:number;
    // public birthDay:Date;
    // public startDate:Date;
    public gender:boolean;
    public active:boolean;
    public roles: Role[]; // מערך של תפקידים

    constructor() {
        this.id++;
        this.roles = []; // אתחול של המערך בבנאי
    }
}
export class Role {
    public name: string;
    public isAdmin: boolean;
    public startDate:Date;
}
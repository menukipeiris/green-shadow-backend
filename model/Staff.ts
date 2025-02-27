import {Gender, Role} from "@prisma/client";

export class Staff{
    staffId!:number;
    firstName!:string;
    lastName!:string;
    designation!:string;
    gender!:Gender;
    joinedDate!:string;
    dob!:string;
    address!:string;
    contactNo!:string;
    email!:string;
    role!:Role;
    fieldId!:number;
}
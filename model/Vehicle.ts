import {Fuel,Status} from "@prisma/client";

export class Vehicle{
    vehicleCode!:number;
    licensePlateNumber!:string;
    vehicleCategory!:string;
    fuelType!:Fuel;
    status!:Status;
    remarks!:string;
    staffId!:number;
}
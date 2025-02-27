import { EquipmentType, Status } from "@prisma/client";

export class Equipment{
    equipmentId!:number;
    name!:string;
    type!:EquipmentType;
    status!:Status;
    remarks!:string;
    staffId!:number;
    fieldId!:number;
}
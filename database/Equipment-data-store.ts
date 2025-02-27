import {EquipmentType,Status, PrismaClient } from "@prisma/client";
import {Equipment} from "../model/Equipment";

const prisma =new PrismaClient();

export async function EquipmentAdd(e: Equipment ){
    try{
        const newEquipment  = await prisma.equipment.create({
            data:{
                name: e.name,
                type: e.type as EquipmentType,
                status: e.status as Status,
                remarks: e.remarks,
                staffId: e.staffId,
                fieldId: e.fieldId
            }

        })
        console.log('equipment Added :',newEquipment)
    }catch(err) {
        console.log("error adding equipment", err);
    }
}

export async function EquipmentUpdate(name: string, e: Equipment){
    try{
        const updatedRecord=await prisma.equipment.update({
            where:{ name : name},
            data:{
                type: e.type,
                status: e.status,
                remarks: e.remarks,
                staffId: e.staffId,
                fieldId: e.fieldId
            }
        })
        console.log("Equipment Updated:", updatedRecord);
    }catch(err){
        console.log("error updating equipment", err);
    }
}

export async function EquipmentDelete(name: string) {
    try{
        await prisma.equipment.delete({
            where: {name: name}
        });
        console.log('Equipment deleted !:',name);
    }catch(err){
        console.log("error deleting Equipment!", err);
    }
}

export async function getAllEquipments(){
    try{
        return await prisma.equipment.findMany();
    }catch(err){
        console.log("error getting Equipments from prisma data",err);
    }
}
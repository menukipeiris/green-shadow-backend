import { Fuel,Status,PrismaClient } from "@prisma/client";
import {Vehicle} from "../model/Vehicle";

const prisma =new PrismaClient();

export async function VehicleAdd(v: Vehicle ){
    try{
        const newVehicle  = await prisma.vehicle.create({
            data:{
                licensePlateNumber: v.licensePlateNumber,
                vehicleCategory: v.vehicleCategory,
                fuelType: v.fuelType as Fuel,
                status: v.status as Status,
                remarks: v.remarks,
                staffId: v.staffId
            }

        })
        console.log('vehicle Added :',newVehicle)
    }catch(err) {
        console.log("error adding vehicle", err);
    }
}

export async function VehicleUpdate(licensePlateNumber: string, v: Vehicle){
    try{
        const updatedRecord=await prisma.vehicle.update({
            where:{ licensePlateNumber : licensePlateNumber},
            data:{
                vehicleCategory: v.vehicleCategory,
                fuelType: v.fuelType,
                status: v.status,
                remarks: v.remarks,
                staffId: v.staffId
            }
        })
        console.log("vehicle Updated:", updatedRecord);
    }catch(err){
        console.log("error updating vehicle", err);
    }
}

export async function VehicleDelete(licensePlateNumber: string) {
    try{
        await prisma.vehicle.delete({
            where: {licensePlateNumber: licensePlateNumber}
        });
        console.log('Vehicle deleted !:',licensePlateNumber);
    }catch(err){
        console.log("error deleting vehicle!", err);
    }
}

export async function getAllVehicles(){
    try{
        return await prisma.vehicle.findMany();
    }catch(err){
        console.log("error getting Vehicles from prisma data",err);
    }
}
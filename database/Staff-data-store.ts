import {Gender, PrismaClient, Role} from "@prisma/client";
import {Staff} from "../model/Staff";

const prisma =new PrismaClient();

export async function StaffAdd(s: Staff ){
    try{
        const newStaff  = await prisma.staff.create({
            data:{
                firstName: s.firstName,
                lastName: s.lastName,
                designation: s.designation,
                gender: s.gender as Gender,
                joinedDate: s.joinedDate,
                dob: s.dob,
                address: s.address,
                contactNo: s.contactNo,
                email: s.email,
                role: s.role as Role,
                fieldId: (s.fieldId)

            }

        })
        console.log('staff Added :',newStaff)
    }catch(err) {
        console.log("error adding staff", err);
    }
}

export async function StaffUpdate(fistName: string, s: Staff){
    try{
        const updatedRecord=await prisma.staff.update({
            where:{ firstName : fistName},
            data:{
                lastName: s.lastName,
                designation: s.designation,
                gender: s.gender,
                joinedDate: s.joinedDate,
                dob:s.dob,
                address:s.address,
                contactNo:s.contactNo,
                email:s.email,
                role:s.role,
                fieldId:s.fieldId
            }
        })
        console.log("Staff Updated:", updatedRecord);
    }catch(err){
        console.log("error updating staff", err);
    }
}

export async function StaffDelete(firstName: string) {
    try{
        await prisma.staff.delete({
            where: {firstName: firstName}
        });
        console.log('staff deleted !:',firstName);
    }catch(err){
        console.log("error deleting staff!", err);
    }
}

export async function getAllStaff(){
    try{
        return await prisma.staff.findMany();
    }catch(err){
        console.log("error getting staff from prisma data",err);
    }
}


export async function getStaffNames(){
    try {
        const staff = await prisma.staff.findMany({
            select: { firstName: true },
        });

        return staff.map(staff => staff.firstName);
    } catch (err) {
        console.error("Error getting staff name list from Prisma", err);
        return [];
    }
}

import {PrismaClient} from "@prisma/client";
import {Field} from "../model/Field";

const prisma= new PrismaClient();

export async function FieldAdd(f: Field ){
    try{
        const extentSizeFloat = Number(f.extentSize);

        const newField  = await prisma.field.create({
            data:{
                fieldName: f.fieldName,
                location: f.location,
                extentSize: extentSizeFloat,
                fieldImage1: f.fieldImage1,
                fieldImage2: f.fieldImage2
            }

        })
        console.log('Field Added :',newField)
    }catch(err) {
        console.log("error adding field", err);
    }

}

export async function FieldUpdate(fieldName: string, updatedField: Partial<Field>) {
    try {
        if (updatedField.extentSize) {
            updatedField.extentSize = Number(updatedField.extentSize);
            if (isNaN(updatedField.extentSize)) {
                throw new Error("Invalid extentSize value. Expected a number.");
            }
        }

        const updatedRecord = await prisma.field.update({
            where: { fieldName },  // Find by fieldCode
            data:{
                location: updatedField.location,
                extentSize: updatedField.extentSize,
                fieldImage1: updatedField.fieldImage1,
                fieldImage2: updatedField.fieldImage2
            }
        });

        console.log("Field Updated:", updatedRecord);
        return updatedRecord;
    } catch (err) {
        console.error("Error updating field:", err);
        throw new Error("Database update failed");
    }
}

export async function FieldDelete(fieldName: string) {
    try{
        await prisma.field.delete({
            where: {fieldName: fieldName}
        });
        console.log('field deleted :',fieldName);
    }catch(err){
        console.log("error deleting field", err);
    }
}

export async function getAllFields(){
    try{
        return await prisma.field.findMany();
    }catch(err){
        console.log("error getting fields from prisma data",err);
    }
}

export async function getFieldNames(){
    try {
        const fields = await prisma.field.findMany({
            select: { fieldName: true },
        });

        return fields.map(field => field.fieldName);
    } catch (err) {
        console.error("Error getting field name list from Prisma", err);
        return [];
    }
}

export async function getFieldIdByName(fieldName: string): Promise<number | null> {
    try {
        const field = await prisma.field.findFirst({
            where: { fieldName: fieldName },
            select: { fieldCode: true }
        });

        return field ? field.fieldCode : null;
    } catch (err) {
        console.error("Error searching fieldId by fieldName", err);
        return null;
    }
}




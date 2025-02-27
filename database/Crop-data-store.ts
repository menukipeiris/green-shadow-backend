
import {PrismaClient} from "@prisma/client";
import {Crop} from "../model/Crop";

const prisma =new PrismaClient();

export async function CropAdd(c: Crop ){
    try{
        const newCrop  = await prisma.crop.create({
            data:{
                commonName: c.commonName,
                scientificName:c.scientificName,
                cropImage1:c.cropImage1,
                category:c.category,
                season:c.season,
                fieldId:c.fieldId
            }

        })
        console.log('crop Added :',newCrop)
    }catch(err) {
        console.log("error adding crop", err);
    }
}

export async function CropUpdate(commonName: string, updatedCrop: Partial<Crop>) {
    try {

        const updatedRecord = await prisma.crop.update({
            where: { commonName },
            data:{
                scientificName:updatedCrop.scientificName,
                cropImage1:updatedCrop.cropImage1,
                category:updatedCrop.category,
                season:updatedCrop.season,
                fieldId:updatedCrop.fieldId
            }
        });

        console.log("crop Updated:", updatedRecord);
        return updatedRecord;
    } catch (err) {
        console.error("Error updating crop:", err);
        throw new Error("crop update failed");
    }
}

export async function CropDelete(commonName: string) {
    try{
        await prisma.crop.delete({
            where: {commonName: commonName}
        });
        console.log('crop deleted !:',commonName);
    }catch(err){
        console.log("error deleting crop!", err);
    }
}

export async function getAllCrops(){
    try{
        return await prisma.crop.findMany();
    }catch(err){
        console.log("error getting crops from prisma data",err);
    }
}


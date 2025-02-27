import { PrismaClient } from "@prisma/client";
import {Log} from "../model/Log";

const prisma= new PrismaClient();

export async function LogAdd(l: Log ){
    try{
        const newLog  = await prisma.monitoringLog.create({
            data:{
                LogDate:l.LogDate,
                logDetails: l.logDetails,
                observedImage: l.observedImage,
                fieldId: l.fieldId,
                cropId: l.cropId,
                staffId:l.staffId
            }

        })
        console.log('Log Added :',newLog)
    }catch(err) {
        console.log("error adding Log", err);
    }

}
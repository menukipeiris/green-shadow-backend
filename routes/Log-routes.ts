import express from "express";
import {Log} from "../model/Log";
import {LogAdd} from "../database/Log-data-store";

const router = express.Router();


const log = (upload: any) => {
    //save
    router.post('/add', upload.fields([{ name: "observedImage", maxCount: 1 }]), async (req, res) => {
        console.log(req.body);

        const {LogDate,logDetails,fieldId,cropId,staffId} = req.body;

        const files = req.files as { [LogDate: string]: Express.Multer.File[] };
        const observedImage = files?.observedImage ? files.observedImage[0].path : '';

        const newLog = new Log();
        newLog.LogDate=LogDate;
        newLog.logDetails = logDetails;
        newLog.observedImage=observedImage;
        newLog.fieldId = fieldId;
        newLog.cropId = cropId;
        newLog.staffId = staffId;

        try {
            const addedLog = await LogAdd(newLog);
            res.send('Log Added');
        } catch (err) {
            console.error("Error adding Log:", err);
            res.status(400).send("Error adding Log" );
        }
    });
    
    return router;
};


export default log;
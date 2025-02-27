import express from "express";
import {Crop} from "../model/Crop";
import {CropAdd, CropDelete, CropUpdate, getAllCrops} from "../database/Crop-data-store";

const router = express.Router();

const crop = (upload: any) => {
    //save
    router.post('/add', upload.fields([{ name: "cropImage1", maxCount: 1 }]), async (req, res) => {
        console.log(req.body);

        const {commonName,scientificName,category,season,fieldId } = req.body;

        const files = req.files as { [commonName: string]: Express.Multer.File[] };
        const cropImage1 = files?.cropImage1 ? files.cropImage1[0].path : '';

        const newCrop = new Crop();
        newCrop.commonName=commonName;
        newCrop.scientificName=scientificName;
        newCrop.cropImage1=cropImage1;
        newCrop.category=category;
        newCrop.season=season;
        newCrop.fieldId=Number(fieldId);


        try {
            const addedCrop = await CropAdd(newCrop);
            res.send('Crop Added');
        } catch (err) {
            console.error("Error adding Crop:", err);
            res.status(400).send("Error adding Crop" );
        }
    });

    //update

    router.put('/update/:commonName', upload.fields([
        { name: "cropImage1", maxCount: 1 }
    ]), async (req, res) => {
        console.log(req.body);

        const {scientificName,category,season,fieldId } = req.body;
        const commonName = req.params.commonName;

        const files = req.files as { [commonName: string]: Express.Multer.File[] };
        const cropImage1 = files?.cropImage1 ? files.cropImage1[0].path : undefined;


        const updatedCrop: Partial<Crop> = {
            commonName,
            scientificName,
            ...(cropImage1 && { cropImage1 }),
            category,
            season,
            fieldId: fieldId ? Number(fieldId) : undefined,
        };

        try {
            const updatedRecord = await CropUpdate(commonName, updatedCrop);
            res.send("Crop updated successfully");
        } catch (err) {
            console.error("Error updating Crop:", err);
            res.status(400).json({ error: "Error updating Crop" });
        }
    });

    //Delete

    router.delete('/delete/:commonName', async (req, res) => {
        const commonName = req.params.commonName;

        try {
            const deleteResult = await CropDelete(commonName);
            res.send("crop delete success!");
        } catch (err) {
            console.error("Error deleting crop:", err);
            res.status(400).json({ error: "Error deleting crop" });
        }
    });

    //get All crops

    router.get('/view',async (req,res,next)=>{
        try{
            const crops=  await getAllCrops();
            res.json(crops);
        }catch(err){
            console.log("error getting crops", err);
        }
    });



    return router;
};

export default crop;
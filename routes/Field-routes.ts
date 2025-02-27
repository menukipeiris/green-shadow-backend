import express from "express";
import {Field} from "../model/Field";
import {
    FieldAdd,
    FieldDelete,
    FieldUpdate,
    getAllFields,
    getFieldIdByName,
    getFieldNames
} from "../database/field-data-store";

const router = express.Router();

const field = (upload: any) => {
    //save
    router.post('/add', upload.fields([{ name: "fieldImage1", maxCount: 1 }, { name: "fieldImage2", maxCount: 1 }]), async (req, res) => {
        console.log(req.body);

        const { fieldName, location, extentSize } = req.body;

        const files = req.files as { [fieldName: string]: Express.Multer.File[] };
        const fieldImage1 = files?.fieldImage1 ? files.fieldImage1[0].path : '';
        const fieldImage2 = files?.fieldImage2 ? files.fieldImage2[0].path : '';

        const newField = new Field();
        newField.fieldName = fieldName;
        newField.location = location;
        newField.extentSize = extentSize;
        newField.fieldImage1 = fieldImage1;
        newField.fieldImage2 = fieldImage2;

        try {
            const addedField = await FieldAdd(newField);
            res.send('field Added');
        } catch (err) {
            console.error("Error adding field:", err);
            res.status(400).send("Error adding field" );
        }
    });

    //update

    router.put('/update/:fieldName', upload.fields([
        { name: "fieldImage1", maxCount: 1 },
        { name: "fieldImage2", maxCount: 1 }
    ]), async (req, res) => {
        console.log(req.body);

        const {location, extentSize} = req.body;
        const fieldName = req.params.fieldName;

        const files = req.files as { [fieldName: string]: Express.Multer.File[] };
        const fieldImage1 = files?.fieldImage1 ? files.fieldImage1[0].path : undefined;
        const fieldImage2 = files?.fieldImage2 ? files.fieldImage2[0].path : undefined;

        const updatedField: Partial<Field> = {
            fieldName,
            location,
            extentSize: extentSize ? Number(extentSize) : undefined,
            ...(fieldImage1 && { fieldImage1 }),
            ...(fieldImage2 && { fieldImage2 })
        };

        try {
            const updatedRecord = await FieldUpdate(fieldName, updatedField);
            res.send("Field updated successfully");
        } catch (err) {
            console.error("Error updating field:", err);
            res.status(400).json({ error: "Error updating field" });
        }
    });

    //Delete

    router.delete('/delete/:fieldName', async (req, res) => {
        const fieldName = req.params.fieldName;

        try {
            const deleteResult = await FieldDelete(fieldName);
            res.send("field delete success!");
        } catch (err) {
            console.error("Error deleting field:", err);
            res.status(400).json({ error: "Error deleting field" });
        }
    });

    //View

    router.get('/view',async (req,res,next)=>{

        try{
            const fields=  await getAllFields();
            res.json(fields);
        }catch(err){
            console.log("error getting fields", err);
        }

    });

    //Field Names

    router.get('/fieldNames', async (req, res, next) => {
        try {
            const fieldNames = await getFieldNames();
            res.json(fieldNames);
        } catch (err) {
            console.error("Error getting field names", err);
        }
    });

    //search fieldId by name
    router.get('/searchFieldId/:fieldName',async (req,res,next)=>{
        const fieldName = req.params.fieldName;
        try{
            const fieldId = await getFieldIdByName(fieldName);
            res.json(fieldId);
        }catch(err){
            console.error("Error searching fieldId", err);
        }
    });

    return router;



};
export default field;




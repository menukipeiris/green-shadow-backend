import express from "express";
import {Equipment} from "../model/Equipment";
import {EquipmentAdd, EquipmentDelete, EquipmentUpdate, getAllEquipments} from "../database/Equipment-data-store";

const router = express.Router();

//save
router.post('/add',async (req,res,next)=>{
    console.log(req.body);

    const equipment: Equipment= req.body;
    Number(equipment.staffId)
    Number(equipment.fieldId)
    try{
        const addedEquipment = await EquipmentAdd(equipment);
        res.send('Equipment Added !')
    }catch(err){
        console.log("error adding equipment", err);
        res.status(400).send("error adding equipment");
    }
});

//update
router.put('/update/:name',async (req,res,next)=>{
    const name: string = req.params.name;
    const equipment : Equipment = req.body;

    Number(equipment.staffId)
    Number(equipment.fieldId)

    try{
        const updatedEquipment=await EquipmentUpdate(name, equipment);
        res.send('Equipment Updated !');
        console.log("equipment updated");

    }catch(err){
        console.log("error updating equipment", err);
    }
});

//delete
router.delete('/delete/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const deleteResult = await EquipmentDelete(name);
        res.send("Equipment delete success!");
    } catch (err) {
        console.error("Error deleting equipment :", err);
        res.status(400).json({ error: "Error deleting Equipment" });
    }
});

//View
router.get('/view',async (req,res,next)=>{
    try{
        const equipment=  await getAllEquipments();
        res.json(equipment);
    }catch(err){
        console.log("error getting Equipments", err);
    }
});

export default router;
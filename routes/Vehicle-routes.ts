import express from "express";
import {Vehicle} from "../model/Vehicle";
import {getAllVehicles, VehicleAdd, VehicleDelete, VehicleUpdate} from "../database/Vehicle-data-store";

const router = express.Router();

//save
router.post('/add',async (req,res,next)=>{
    console.log(req.body);

    const vehicle: Vehicle= req.body;
    Number(vehicle.staffId)
    try{
        const addedVehicle = await VehicleAdd(vehicle);
        res.send('vehicle Added !')
    }catch(err){
        console.log("error adding vehicle", err);
        res.status(400).send("error adding vehicle");
    }
});

//update
router.put('/update/:licensePlateNumber',async (req,res,next)=>{
    const licensePlateNumber: string = req.params.licensePlateNumber;
    const vehicle : Vehicle = req.body;
    Number(vehicle.staffId)

    try{
        const updatedVehicle=await VehicleUpdate(licensePlateNumber, vehicle);
        res.send('Vehicle Updated !');
        console.log("vehicle updated");

    }catch(err){
        console.log("error updating vehicle", err);
    }
});

//delete
router.delete('/delete/:licensePlateNumber', async (req, res) => {
    const licensePlateNumber = req.params.licensePlateNumber;

    try {
        const deleteResult = await VehicleDelete(licensePlateNumber);
        res.send("Vehicle delete success!");
    } catch (err) {
        console.error("Error deleting vehicle:", err);
        res.status(400).json({ error: "Error deleting vehicle" });
    }
});

//View
router.get('/view',async (req,res,next)=>{
    try{
        const vehicles=  await getAllVehicles();
        res.json(vehicles);
    }catch(err){
        console.log("error getting vehicles", err);
    }
});

export default router;